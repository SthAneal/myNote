// import React from 'react';
import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import axios from 'axios';
import './App.css';
import {Login} from './components/Login';
import {Register} from './components/Register';
import {Home} from './components/Home';

import Axios from './api/Axios';


type userInfo = {
  name:string
}

function App() {

  const [user, setUser] = useState<userInfo>({} as userInfo);

  useEffect(()=>{
    getName();
    }, [])

  // const getName = async ()=>{
  //   // const response = await axios.get('/name');
  //   // console.log(response);
  //   // setUser({name:response.data});
  //   setUser({name:'Anil Shrestha'});

  // }

  const getName = async ()=>{
    const response = await Axios.get('/api/register');
    // const response = await Axios.get('/api/login');

    console.log(response);
    setUser({name:response.data.msg});
}

  return (
    <>
      <div>User name: {user.name}</div>
      {/* <div>{user.name}</div> */}
      <Router>
        <Routes>
          <Route path="/login" caseSensitive={false} element={<Login />} />
          <Route path="/register" caseSensitive={false} element={<Register />} />
          <Route path="/" caseSensitive={false} element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
