import { useContext } from "react";

import { FlexDiv } from "../styles/globalStyleComponent";
import GoogleButton  from "react-google-button";
import { MyNotesContext } from "../context/MyNotesContext";

export const Auth = ()=>{
    const myNoteContext = useContext(MyNotesContext);


    /**
     * It will call the google sign in provider
     * @author Anil
     */
    const handleGoogleSignIn = async ()=>{
        try {
            await myNoteContext.googleSignIn();
        } catch (error) {
            console.error(error);
        }
    }


    return(
        <FlexDiv flex="1 1 auto" flexDirection="column" justifyContent="start" gap="50px" alignItems="center">
            <FlexDiv flex="0 0 50px" width="100%" justifyContent="center">
                Welcome to Login Page!!!
            </FlexDiv>
            <FlexDiv flex="1 1 auto" width="100%" justifyContent="center">
                <GoogleButton onClick={handleGoogleSignIn} />
            </FlexDiv>
        </FlexDiv>
    )
}