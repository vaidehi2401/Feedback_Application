import React from 'react'
import logo from '../Assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComment,  faRightFromBracket, faDashboard, faBars} from '@fortawesome/free-solid-svg-icons';
import './MainHeader.css';
import Container from 'react-bootstrap/Container';
import { Tooltip } from 'antd';


import { Outlet, useLocation, useNavigate } from 'react-router-dom';
function MainHeader({ name1, popup }) {
  const info =useLocation();
  const name= info.state.name;
   const navigate= useNavigate();
  const feed=()=>{
    navigate('Feedback', {state:{name: name}})
  }
  const fun=()=>{
    navigate('/');
  }
  const text="Home";
  return (

    <div className="container1">
      <div className ="col1">
      
    <FontAwesomeIcon icon={faBars} className='iconm'/><br></br>
    <Tooltip placement="rightTop" title="Timeline">
    <FontAwesomeIcon icon={faDashboard} className='icon1' onClick= {()=>{navigate('Home1',{state:{name:name}})}}/></Tooltip><br></br>
    <Tooltip placement="rightTop" title="Feedback">
    <FontAwesomeIcon icon={faComment} className='icons' onClick={feed}/></Tooltip><br></br>
    <Tooltip placement="rightTop" title="Messages">
    <FontAwesomeIcon icon={faMessage} className='icons' onClick={()=>{navigate('Message',{state:{name:name}})}}/></Tooltip><br></br>
    <Tooltip placement="rightTop" title="Logout">
    <FontAwesomeIcon icon={faRightFromBracket} className='icons' onClick={fun}/></Tooltip>
   </div>
   <div className ="col2">
    <Outlet/>
    </div>
    </div>
   
    
  )
}

export default MainHeader
