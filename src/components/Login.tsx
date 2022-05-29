import React, {useState, useEffect} from 'react';
import axios from 'axios';

type userInfo = {
    name:string
  }

export const Login = ()=>{
    const [user, setUser] = useState<userInfo>({} as userInfo);

    useEffect(()=>{
    getName();
    }, [])


    const getName = async ()=>{
        const response = await axios.get('/http://143.198.234.42/api/dashboard');
        console.log(response);
        setUser({name:response.data});
    }

    return(
        <div>Login: {user.name}</div>
    )
}