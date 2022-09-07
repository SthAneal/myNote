import React, { useEffect } from 'react';

// import google realtime database instance
import { ref, set, onValue, update, remove } from 'firebase/database';

// import google authProvider and other related functions
import { 
    GoogleAuthProvider,
    // signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth, db } from "../firebase";



export type NoteType = {
    id:number| null
    description:string|''
    // date:Date
    bgColor: string
}

type ShowDots = boolean | null;

type StringOrUnknown = string | null | undefined;

type User = {
    displayName?:StringOrUnknown
    email?:StringOrUnknown
    uid?:StringOrUnknown
    photoURL?:StringOrUnknown
}

export type MyNotesStateType = {
    notes:NoteType[]
    showDots:ShowDots
    user: User | null
}

type MyNotesContextType = {
    state:MyNotesStateType
    addNewNote:(bgColor:string)=>void
    showDots:(showSots:boolean)=>void
    saveNote:(id:number, description:string, bgColor:string)=>void
    googleSignIn:()=>void
    logOut:()=>void
    deleteNote:(id:number)=>void
}

type MyNotesProviderProps = {
    children:React.ReactNode
}

type ActionType = {
    type:'ADD_NEW_NOTE' | 'DEL_TEMP_NOTE_TYPE' | 'SHOW_DOTS' | 'SAVE_NOTE' | 'UPDATE_USER' | 'REFRESH_ALL_NOTE'
    payload:{
        note?:NoteType
        showDots?:ShowDots
        user?:User
        notes?:NoteType | any
    }
}

/**
 * This is the reducer function going to be used with React.useReducer
 * @author: Anil
 * @param {MyNotesStateType} state --- The state of the MyNote.
 * @param {ActionType} action --- The Action for the dispatch function.
 */

const reducer = (state:MyNotesStateType, action:ActionType):MyNotesStateType=>{
    switch(action.type){
        case 'REFRESH_ALL_NOTE':{
            // return {...state, notes:[...state.notes,{...action.payload.note!}]}
            return {...state, notes:[...action.payload.notes], showDots:action.payload.showDots!};
        }
        // case 'ADD_NEW_NOTE':{
        //     // create new note
        //     set(ref(db, `/${state.user?.uid}/${action.payload.note?.id}`), {...action.payload.note});
        //     return {...state, showDots:action.payload.showDots!};
        //     // return {...state, notes:[...state.notes!,{...action.payload.note!}], showDots:action.payload.showDots!};
        // }
        case 'SHOW_DOTS':{
            return {...state, showDots:action.payload.showDots!};
        }
        // case 'SAVE_NOTE':{
        //     const newNote = state.notes.map((note)=>{
        //         if (note.id === action.payload.note?.id){
        //             // note.bgColor = action.payload.note.bgColor;
        //             // note.description = action.payload.note.description;
        //             return {...note, description:action.payload.note.description}
        //         }else{
        //             return {...note};
        //         }
        //     })
        //     return {...state, notes:newNote, showDots:action.payload.showDots!};
        // }
        case 'UPDATE_USER':{
            return {...state, user:{...action.payload.user}}
        }
        default:{
            return state;
        }
    }
}

/*
    Defining initial state
*/

const initialState: MyNotesStateType = {
    notes:[],
    showDots:null,
    user:null
}


export const MyNotesContext = React.createContext({} as MyNotesContextType);

export const MyNotesProvider = ({children}:MyNotesProviderProps)=>{
    /**
     * This is a function to provide google authentication provider
     * @author Anil
     */
    const googleSignIn = ()=>{
        const googleAuthProvider = new GoogleAuthProvider();
        // signInWithPopup(auth, googleAuthProvider);
        signInWithRedirect(auth, googleAuthProvider);
    }

    /**
     * This function calls firebase signOut() for authentication
     * @author Anil
     */
    const logOut = ()=>{
        signOut(auth);
    }


    /**
     * This is a React.useReducer for MyNotesContext
     * @author: Anil
     * @param {function reducer<state, dispatch>(state:MyNotesStateType, action:ActionType) { } } reducer - reducer function for MyNoteContext
     * @param {MyNotesStateType} initialState - The initial state to be supplied into useReducer function 
     */

    const [state, dispatch] = React.useReducer(reducer, initialState);


    /**
     * This is the action function to dispatch 'ADD_NEW_NOTE' event
     * @author Anil
     * @param {bgColor:string} takes background colour as an argument when clicking add note button.
     * It will be set as the background of new note whose content will be 'new note' and the Id is genereated 
     * by Date.now()
     */
    const addNewNote = (bgColor:string)=>{
        // console.log('hello from new note');
        const id =  Date.now();
        // dispatch({type:'ADD_NEW_NOTE', payload:{note:{id,description:'new note',bgColor},showDots:false}});
        set(ref(db, `/${state.user?.uid}/${id}`), {id,description:'new note',bgColor});

    }


     /**
     * This is the action function to dispatch 'SHOW_DOTS' event
     * @author: Anil
     * @param {showDots:boolean} takes boolean flag that controls the visiblity of dots to add new add.
     */
    const showDots = (showDots:boolean)=>{
        dispatch({type:'SHOW_DOTS', payload:{note:{id:null,description:'',bgColor:''}, showDots:true}});
    }


    /**
     * It will save the edited note
     * @param id -- id of last edited note
     * @param description -- descriptioin of last edited note
     * @param bgColor -- bgColor of last edited note
     * @author Anil 
     * @remark - saveNote() will update the respective note in real time
     */
    const saveNote = (id:number, description:string, bgColor:string)=>{
        // console.log(`id:${id};description:${description}`);

        update(ref(db,`/${state.user?.uid}/${id}`), {id, description, bgColor})
            .then(()=>{
                console.log('data updated successfully');
            })
            .catch((error)=>console.error(error));

        // dispatch({type:'SAVE_NOTE', payload:{note:{id, description, bgColor}, showDots:false}});
    }


    /**
     * It will delete the corresponding entry based on the supplied id.
     * @param id -- id of the note to be deleted.
     * @author Anil
     */
    const deleteNote = (id:number)=>{
        remove(ref(db,`/${state.user?.uid}/${id}`));
    }


    /**
     * It will dispatch UPDATE_USER action to update the authorised user detail.
     * @param displayName -- Display name of the authorised user
     * @param email -- Email of the authorised user
     * @param uid -- User id of the authorised user
     * @param photoURL -- Photo Url of the authorised user if available
     * @author Anil
     */
    const updateUser = (displayName:StringOrUnknown, email:StringOrUnknown, uid:StringOrUnknown, photoURL:StringOrUnknown)=>{
        dispatch({
            type:'UPDATE_USER', 
            payload:{
                user:{displayName,email,uid,photoURL}
            }}
        )
    }


    /**
     * It will dispatch REFRESH_ALL_NOTE action type.
     * @param notes 
     * @remark When onAuthStateChanged triggers any changes on real time database it will trigger this action type and re renders the view with updated notes. 
     * It will set the showDots as false.
     * @author Anil
     */
    const refreshAllNote = (notes: any)=>{
        dispatch({
            type:'REFRESH_ALL_NOTE',
            payload:{
                notes,
                showDots:false
            }
        })
    }


    useEffect(()=>{
        /**
         * To get the state of user login
         * @author Anil
         */
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            updateUser(currentUser?.displayName, currentUser?.email, currentUser?.uid, currentUser?.photoURL)
            // console.log('User', currentUser);
            if(currentUser){
                onValue(ref(db, `/${currentUser?.uid}`),(snapshot)=>{
                    const data = snapshot.val();
                    // console.log(data);
                    if(data && data !== null){
                        const tempNotes = Object.values(data);
                        // Object.values(data).map((note)=>{
                        //     return refreshAllNote(note);
                        // })
                        refreshAllNote(tempNotes!);
                    }
                })
            }
        });

        return ()=>{
            unsubscribe();
        };
    }, [])


    return(
        <MyNotesContext.Provider value={{state, addNewNote, showDots, saveNote, googleSignIn, logOut, deleteNote}}>
            {children}
        </MyNotesContext.Provider>
    )
}