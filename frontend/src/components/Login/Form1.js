
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import user from '../Assets/person.png'
import './Login.css'
const initialUser = { password: "", identifier: "" };
function Form1() {
  const [action, setAction] = useState("Login");
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setAction("Login");
    alert("You are not signed in please sign up");
  };
  return (
    <div className ="main-div">
    <div className = "main-div1">
  <div className = "container">
    <div className = "header">
      <div className = "text">{action}</div>
      <div className = "underline"></div></div>
      <div className = "inputs">
        <div className = "input">
          <img src={email} alt =""/>
          <input type ="email" name ="identifier" value={user.identifier} placeholder ="Email" onChange={handleChange}/>
        </div>
        <div className = "input">
          <img src={password} alt =""/>
          <input type ="password" name ="password" value={user.password} placeholder ="Password" onChange={handleChange}/>
        </div>
      </div>
      <div className = "forgot-password">Lost Password? <span>Click Here</span></div>
    <div className = "submit-container">
     <div className = {action==="Login"? "submit gray": "submit"} >Sign Up</div>
     <div className = {action==="Sign Up"? "submit gray": "submit"} onClick ={handleLogin}>Log In</div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Form1
