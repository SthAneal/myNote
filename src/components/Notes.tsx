import  React from "react";
// import { useState } from "react";
import { NoteType } from "../context/MyNotesContext";
import { FlexDiv } from "../styles/globalStyleComponent";
import { MdModeEdit, MdDelete, MdBookmarkAdded, MdBookmark } from "react-icons/md";
import { MyNotesContext } from '../context/MyNotesContext';


type NotesPropType = {
    note:NoteType
    className:string | ''
}

export const Notes = ({note, className}:NotesPropType)=>{
    const { updateNote, deleteNote} = React.useContext(MyNotesContext);


    /**
     * @param id -- id of respective note item
     * @author Anil
     * @description -- to toggle the disable property of note textArea. 
     */
    const toggleNoteTextArea = (id:string)=>{
        const textAreaState = document.getElementById(id)?.getAttribute('disabled');
        if(!textAreaState){
            document.getElementById(id)?.setAttribute('disabled', 'true');
        }else{
            document.getElementById(id)?.removeAttribute('disabled');
        }
    }


    /**
     * 
     * @param e React.MouseEvent<HTMLTextAreaElement>
     * @param id to update the note based on the provided id
     * @author Anil
     * @description to disable the textArea after mouseOut.
     */
    const saveNoteItem = (e:React.ChangeEvent<HTMLTextAreaElement>, id:number)=>{
        updateNote({id,description:e.target.value});
    }


    /**
     * @param id -- id of note to be remove to pass into MyNotesContext's deleteNote()
     * @author Anil
     * @description asks for confirmation. If confirmed then calles deleteNote(id:string) to delete from realtime database.
     */
    const removeNote = (id:number)=>{
        if(window.confirm('Do you want to delete the note?') === true){
            deleteNote(id);
        }
    }


    /**
     * 
     * @param id -- id of the edited note to make it disable.
     * @author Anil
     * @description when mouse is remove out of the edited note then it will disable it.
     */
    const disableTextArea = (id:string)=>{
        const elem = document.getElementById(id);
        // console.log(elem);
        elem?.setAttribute('disabled','true');
    }

    /**
     * It will call the updateNote() of myNoteContext.
     * @param id of type number representing the id of the note being edit.
     * @param isBookmarked of type boolean representing the bookmark flag of the note being edit.
     * @author Anil
     * @description it will alter the isBookmarked true or false based on the supplied value.
     */
    const toggleBookmark = (id:number, isBookmarked:boolean)=>{
        let finalIsBookmarked:boolean;

        if(isBookmarked !== undefined)
            finalIsBookmarked = !isBookmarked;
        else
            finalIsBookmarked = true;
            
        updateNote({id, isBookmarked:finalIsBookmarked});
    }

    return(
        <FlexDiv flex="0 0 320px" height="200px" flexDirection="column" key={note.id} className={`noteSection__item ${className}`} style={{'background':note.bgColor}}>
            <FlexDiv flex="1 1 auto" width="100%">
                <FlexDiv flex="1 1 auto" height="100%">
                    <FlexDiv flex="1 1 100%" height="100%">
                        <textarea 
                            disabled={true} 
                            name={note.description} 
                            id={`noteId${note.id}`} 
                            cols={30} rows={10} 
                            className="noteTextArea"  
                            onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>)=>saveNoteItem(ev, note.id!)} value={note.description}
                            onMouseOut={(e:React.MouseEvent<HTMLTextAreaElement>)=>disableTextArea(`noteId${note.id}`)}
                        />
                    </FlexDiv>
                </FlexDiv>
                <FlexDiv flex="0 0 50px" flexDirection="column" justifyContent="flex-start" alignItems="center" gap="15px" padding="5px" className="noteBtns__wrapper">
                    <div onClick={()=>toggleNoteTextArea(`noteId${note.id}`)}>
                        <MdModeEdit className="noteBtns"/>
                    </div>
                    <div  onClick={()=>removeNote(note.id!)}> 
                        <MdDelete className="noteBtns"/>
                    </div>
                    {note.isBookmarked?<div onClick={()=>toggleBookmark(note.id!, note.isBookmarked)}><MdBookmarkAdded className="noteBtns bookmarked"/></div>:''}
                    {!note.isBookmarked?<div onClick={()=>toggleBookmark(note.id!, note.isBookmarked)}><MdBookmark className="noteBtns"/></div>:''}
                    {/* <MdSave onClick={()=>saveNoteItem(note.id!)}/> */}
                </FlexDiv>
            </FlexDiv>
            <FlexDiv flex="0 0 30px" width="100%" alignItems="center" justifyContent="flex-end" padding="2px 10px" className="noteSection__date">
                {note.created}
            </FlexDiv>
        </FlexDiv>
    )
}