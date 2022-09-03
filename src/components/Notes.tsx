import  React from "react";
// import { useState } from "react";
import { NoteType } from "../context/MyNotesContext";
import { FlexDiv } from "../styles/globalStyleComponent";
import { MdModeEdit, MdSave } from "react-icons/md";
import { MyNotesContext } from '../context/MyNotesContext';


type NotesPropType = {
    note:NoteType
    className:string | ''
}

export const Notes = ({note, className}:NotesPropType)=>{
    const { saveNote } = React.useContext(MyNotesContext);

    // const [textAreaValue, setTextAreaValue] = useState<string>('');

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
     * @author Anil
     * @description to disable the textArea after mouseOut.
     */
    const saveNoteItem = (e:React.ChangeEvent<HTMLTextAreaElement>, id:number, bgColor:string)=>{
        saveNote(id,e.target.value, bgColor);
    }

    const disableTextArea = (e:React.MouseEvent<HTMLTextAreaElement>, id:string)=>{
        const elem = document.getElementById(id);
        // console.log(elem);
        elem?.setAttribute('disabled','true');
    }

    return(
        <FlexDiv flex="1 0 320px" height="200px" key={note.id} className={`noteSection__item ${className}`} style={{'background':note.bgColor}}>
            <FlexDiv flex="1 1 auto" height="100%">
                <FlexDiv flex="1 1 100%" height="100%">
                    <textarea 
                        disabled={true} 
                        name={note.description} 
                        id={`noteId${note.id}`} 
                        cols={30} rows={10} 
                        className="noteTextArea"  
                        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>)=>saveNoteItem(ev, note.id!, note.bgColor)} value={note.description}
                        onMouseOut={(e:React.MouseEvent<HTMLTextAreaElement>)=>disableTextArea(e,`noteId${note.id}`)}
                    />
                </FlexDiv>
            </FlexDiv>
            <FlexDiv flex="0 0 40px" flexDirection="column" justifyContent="start" alignItems="center" gap="10px" padding="5px">
                <MdModeEdit onClick={()=>toggleNoteTextArea(`noteId${note.id}`)}/>
                {/* <MdSave onClick={()=>saveNoteItem(note.id!)}/> */}
            </FlexDiv>
        </FlexDiv>
    )
}