import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import email from '../Assets/email.png'
import password from '../Assets/password.png'
import user from '../Assets/person.png'
import './SignUp.css'
import Alert from 'react-bootstrap/Alert';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
function SignUp() {
    {/*const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');*/}
const[state, setState] = useState({name:"", email:"", password:""})
const [formErrors, setformErrors] = useState({});
const username= state.name;
const email = state.email;
const password= state.password;
  const [action, setAction] = useState("Sign Up");
  const identifier = state.name;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

const regexe= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const regexp=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const handleSignup = async (e) => {
    setAction("Sign Up")
    setformErrors(validate(state));
      if(Object.keys(formErrors).length === 0){
    e.preventDefault(); 
    try{
      const response = await axios.post('http://localhost:1337/api/forms',{
        "data":{
        "username" : state.name,
        "email": state.email,
        "password": state.password
        }
      }
      );
      console.log("successfull")
    }
    catch(error){
      console.error(error)
    }
    try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
            username, 
            email,
            password
        });

        console.log('Signup Success:', response.data);
        navigate('Home',{state:{name: state.name}} )
    } catch (error) {
        console.log("Your format is not right try again")
    }        
  }
  else{
 console.log(formErrors) } 
};
const handleLogin = async (e) => {
  setAction("Login")
  setformErrors(validate1(state));
  e.preventDefault();
  if(Object.keys(formErrors).length === 0){
  try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier,
          password
      });

      navigate('Home',{state:{name: state.name}} )
      console.log('Login Success:', response.data);

      // Store the user's JWT token (response.data.jwt) for authentication
      // Redirect to a protected area of your application
  } catch(err){
    console.log(err)
  }}
  else{
    console.log(formErrors)
  }
};
const validate=(values)=>{
const errors={};
if(!values.name){
errors.name="Username is required"
}
if(!values.email){
  errors.email = "Email is required"
}
else if(!regexe.test(values.email)){
  errors.email ="Email is not in proper format"
}
if(!values.Password){
  errors.password="Password is required"
}
else if(!regexe.test(values.email)){
  errors.email ="Email is not in proper format"
}
else if(!regexp.test(values.password)){
  errors.password = "Password is not in proper format"
}
return errors;  
}
const validate1=(values)=>{
  const errors={};
  if(!values.name){
  errors.name="Username is required"
  }
  if(!values.password){
    errors.password="Password is required"
  }
  else if(!regexp.test(values.password)){
    errors.password = "Password is not in proper format"
  }
  return errors;  
  }
   
  return (
    <div className ="main-div">
      <div className = "main-div1">
    <div className = "container">
      <div className = "header3">
        <div className = "text4">{action}</div>
        <div className = "underline"></div></div>
        <div className = "inputs">
        <div className = "input1">
            <img src={user} alt =""/>
            <input type ="text" value={state.name} placeholder ="Name"  onChange ={(ev)=>{setState({...state, name:ev.target.value})}} />
            
            
          </div>
          {action==="Login"?<div></div>:<div className = "input1">
            <img src={email} alt =""/>
            <input type ="email" value={state.email} placeholder ="Email"  onChange ={(ev)=>{setState({...state, email:ev.target.value})}}/>
          </div>}
          <div className = "input1">
            <img src={password} alt =""/>
            <input type ={visible? "text": "password"} value={state.password} placeholder ="Password"  onChange ={(ev)=>{setState({...state, password:ev.target.value})}}/>
            {visible?
              <FontAwesomeIcon icon={faEye} className="icon" onClick={()=>{setVisible(!visible)}}/>: <FontAwesomeIcon icon={faEyeSlash} className="icon" onClick={()=>{setVisible(!visible)}}/> }
          </div>
        </div>
        <div className = "forgot-password">Lost Password? <span>Click Here</span></div>
      <div className = "submit-container">
       <div className = {
    (!state.name || !state.email || !(regexe.test(state.email))|| !state.password || !(regexp.test(state.password)) || action === "Login")? "submit gray": "submit"
  } onClick ={handleSignup} >Sign Up</div>
       <div className = {
    ((!state.name) || (!state.password) || (!regexp.test(state.password)) || (action === "Sign Up"))? "submit gray": "submit"
  } onClick ={handleLogin}>Log In</div>
      </div>
      </div>
      </div>
      </div>
  )
}

export default SignUp
