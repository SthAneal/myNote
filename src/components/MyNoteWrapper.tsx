import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FlexDiv } from "../styles/globalStyleComponent";
import { MdFace, MdLogout } from "react-icons/md";

import { MyNotesContext } from '../context/MyNotesContext';

export const MyNoteWrapper = ()=>{
    const myNotesContext = useContext(MyNotesContext);
    const navigate = useNavigate();


    /**
     * It will log out the current user
     * @author Anil
     */
    const handleLogOut = async ()=>{
        try {
            await myNotesContext.logOut();
            console.log('loged out');
        } catch (error) {
            console.error(error);
        }
    }


    // if user is loged out then redirect to /mynote/
    useEffect(()=>{
        if(!myNotesContext.state.user?.displayName){
            navigate('/mynote');
        }else{
            navigate('/mynote/docket');
        }
    },[myNotesContext.state.user, navigate])

    
    return(
        <FlexDiv flex="1 1 100%" height="100%" flexDirection="column" justifyContent="center">
            {
                myNotesContext.state.user?.displayName?
                <FlexDiv flex="0 0 50px" width="100%" justifyContent="end" gap="15px" alignItems="center">
                    <FlexDiv flex="0 0 auto" gap="5px" alignItems="center">
                        <MdFace/>
                        <span>{myNotesContext.state.user?.displayName}</span>
                    </FlexDiv>
                    <FlexDiv flex="0 0 auto" gap="5px" className="logoutBtn" alignItems="center" onClick={handleLogOut}>
                        <span>Logout</span>
                        <MdLogout/>
                    </FlexDiv>                        
                </FlexDiv>:''
            }
            <FlexDiv flex="1 1 auto" width="100%">
                <Outlet/>
            </FlexDiv>
        </FlexDiv>
    )
}