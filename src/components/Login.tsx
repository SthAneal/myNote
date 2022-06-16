import React, {useState, useEffect} from 'react';
import Axios from '../api/Axios';
import {FlexDiv} from '../styles/globalStyleComponent';

type userInfo = {
    name:string
  }

export const Login = ()=>{
    const [user, setUser] = useState<userInfo>({} as userInfo);

    useEffect(()=>{
    getName();
    }, [])


    const getName = async ()=>{
        const response = await Axios.get('/api/login');
        // const response = await Axios.get('/api/login');

        console.log(response);
        setUser({name:response.data.msg});
    }

    return(
        <FlexDiv flex width="100%" justifyContent="center" flexDirection="row" flexGap="10px" overflowX="scroll">
            <FlexDiv flex="0 1 20%">
                Login: {user.name}
            </FlexDiv>
            <FlexDiv flex="0 0 100px">
                this is flex 0 0 100px
            </FlexDiv>
            <FlexDiv flex="1 1 auto" justifyContent="center">
                this is flex 1 1 auto
            </FlexDiv>
        </FlexDiv>
    )
}