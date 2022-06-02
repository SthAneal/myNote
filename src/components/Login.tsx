import React, {useState, useEffect} from 'react';
import Axios from '../api/Axios';

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
        <div>Login: {user.name}</div>
    )
}