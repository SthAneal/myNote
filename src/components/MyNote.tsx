import React, { useContext, useRef, useEffect, ReactEventHandler } from 'react';
import { MyNotesContext } from '../context/MyNotesContext';

import { MdAddCircle, MdOutlineSearch } from 'react-icons/md';
import { FlexDiv } from '../styles/globalStyleComponent';
import  '../styles/myNote.scss';

import { Notes } from './Notes';


export const MyNote = ()=>{

    const dotWrapper = useRef<HTMLDivElement>(null!);
    // const showDotsBtn = useRef<HTMLButtonElement>(null!);
    const MyNoteContext = useContext(MyNotesContext);

    const searchInput = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(MyNoteContext.state.showDots === true)
            displayDots();
        
        if(MyNoteContext.state.showDots === false)
            hideDots();
        
    }, [MyNoteContext.state.showDots]);

    const addNewNote = (bgColor:string)=>{
        MyNoteContext.addNewNote(bgColor);
    }

    const displayDots = ()=>{
        const children = dotWrapper.current.children;
        for(let i =0; i<children.length;i++){
            children[i].classList.add('dot');
        }
    }

    const hideDots = ()=>{
        // showDotsBtn.current.disabled = true;
        const children = dotWrapper.current.children;
        for(let i =0; i<children.length;i++){
            children[i].classList.add('dotHide');
        }
        const timeOut = setTimeout(()=>{

            for(let i =0; i<children.length;i++){
                children[i].classList.remove('dot','dotHide');
            }
            clearTimeout(timeOut);
            // showDotsBtn.current.removeAttribute('disabled');
        },2000);
    }

    const setShowDotsState = ()=>{
        MyNoteContext.showDots(true);
        // showDotsBtn.current.disabled = true;
    }


    /**
     * search note based on description and date
     * @param searchValue of type string 
     * @author Anil
     */
    const searchNote = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const searchValue = searchInput.current?.value;
        console.log('hello from searchNote', searchValue)

        MyNoteContext.searchNote(searchValue?searchValue:null);
    }

    const reversedNote = [...MyNoteContext.state.notes].reverse();

    return(
        <FlexDiv flex="1 1 100%" className="noteWrapper">
            <FlexDiv flex="0 0 85px" flexDirection="column" alignItems="center" className="addNoteSec">
                <FlexDiv flex="0 0 75px" justifyContent="center" alignItems="center" className="noteLogo"><h3>Docket</h3></FlexDiv>
                <FlexDiv flex="0 0 auto"  justifyContent="center" alignItems="center" className="MdAddCircle__wrapper">
                    <MdAddCircle onClick={setShowDotsState} className="MdAddCircle"/>
                </FlexDiv>
                <FlexDiv flex="1 1 auto" width="100%" justifyContent="center" className="dot__wrapper" ref={dotWrapper}>
                    <span className="dot__wrapper-soft-yellow" onClick={()=>addNewNote('#ECE5C7')}></span>
                    <span className="dot__wrapper-soft-green" onClick={()=>addNewNote('#CAF7E3')}></span>
                    <span className="dot__wrapper-off-green" onClick={()=>addNewNote('#EDFFEC')}></span>
                    <span className="dot__wrapper-off-pink" onClick={()=>addNewNote('#F6DFEB')}></span>    
                    <span className="dot__wrapper-in-pink" onClick={()=>addNewNote('#E4BAD4')}></span>    
                </FlexDiv>    
            </FlexDiv>
            <FlexDiv flex="1 1 auto" flexDirection="column" height="100%" padding="0 10px 0 50px">
                <FlexDiv flex="0 0 75px" width="100%" justifyContent="flex-start" alignItems="center" className="noteSearch__wrapper"> 
                    <form onSubmit={(e)=>searchNote(e)}>
                        <FlexDiv flex="0 0 auto" className="noteSearch">
                            <input type="search" placeholder="Search and enter" ref={searchInput}/>
                            <MdOutlineSearch className="noteSearch__icon"/>
                        </FlexDiv>
                    </form>
                </FlexDiv>
                <FlexDiv flex="1 1 auto" width="100%" flexDirection="column" justifyContent="flex-start" className="noteList__wrapper">
                    <FlexDiv flex="0 0 auto"><h1>Notes</h1></FlexDiv>
                    <FlexDiv flex="0 0 calc(100vh - 250px)" flexWrap="wrap" width="100%" gap="20px" alignItems="flex-start" className="noteSection">
                       {    
                            // display the notes in reverse order
                            reversedNote.map((note)=>(
                                <Notes key={note.id} note={note}  className={reversedNote.indexOf(note) === 0?'newNote':''} />
                            ))
                        }
                    </FlexDiv>
                </FlexDiv>
            </FlexDiv>
        </FlexDiv>
    )
}