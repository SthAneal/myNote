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
        <FlexDiv flex="1 1 auto" flexDirection="column" justifyContent="flex-start" gap="50px" alignItems="center">
            <FlexDiv flex="0 0 50px" width="100%" justifyContent="center" alignItems="center" className="welcomeNote">
                <h2>Welcome to The Note.</h2>
            </FlexDiv>
            <FlexDiv flex="0 0 200px" width="240px" flexDirection="column" justifyContent="center" gap="15px" className="login__wrapper">
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="password"/>
                <button onClick={()=>alert('Opps!!! work in progress. Please sign via your google account.')}>Submit</button>
            </FlexDiv>
            <FlexDiv flex="0 0 auto" width="100%" justifyContent="center">
                <GoogleButton onClick={handleGoogleSignIn} />
            </FlexDiv>
        </FlexDiv>
    )
}