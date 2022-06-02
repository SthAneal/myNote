import React, {useState, useEffect} from 'react';
import Axios from '../api/Axios';

type userInfo = {
    name:string
  }

export const Register = ()=>{
    const [user, setUser] = useState<userInfo>({} as userInfo);

    useEffect(()=>{
        getName();
    }, [])

    const getName = async ()=>{
        const response = await Axios.get('/api/register');
        // const response = await axios.get('http:localhost:3000/api/register');

        console.log(response);
        setUser({name:response.data.msg});
      }
    return(
        <div>Register:{user.name}</div>
    )
}