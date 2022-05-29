import React, {useState, useEffect} from 'react';
import axios from 'axios';

type userInfo = {
    name:string
  }

export const Register = ()=>{
    const [user, setUser] = useState<userInfo>({} as userInfo);

    useEffect(()=>{
        getName();
    }, [])

    const getName = async ()=>{
        const response = await axios.get('/http://localhost:3000/api/home');
        console.log(response);
        setUser({name:response.data});
      }
    return(
        <div>Register:{user.name}</div>
    )
}