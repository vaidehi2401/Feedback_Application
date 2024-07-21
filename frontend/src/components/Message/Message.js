import React from 'react'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import client from '../../utils/apolloClient.js';
import './Message.css'
import { Layout, Sider, List, Avatar, message } from 'antd';
const MESSAGES = gql`
query Getmessages($name : String!){
  messages(filters:{To: {eq: $name}}){
    data{
      attributes{
        From,
        To,
        Date,
        Feedback,
        Type
      }
    }
  }
  }
`
function Message() {
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const info = useLocation();
  const name=info.state.name;
  const [messages1, setMessages1] = useState([]);
  const[selectedD, setSelectedD] = useState(null);
  {/*const{loading, error, data} = useQuery(MESSAGES,{
    variables: {name: name}
  });*/}
  const fun=()=>{
    console.log(messages1.data.messages.data);
    console.log(selectedD)
  }
 useEffect(()=>{
  const fetchData= async()=>{
    try{
      const response = await client.query({query: MESSAGES,
      variables:{name:name}});
      setMessages1(response);
      setLoading(false);
    }
    catch(err){
      console.log(err)
    }
  }
  fetchData();
 }, []);
   
  return (
    <div>
    <div className="hheader">
      {/*<img src={logo} className='logo1'/>*/}
     <h4 className='timeline'>Timeline</h4>
     <h4 className="name">{name}</h4>
    </div>
    <div className='hbody'>
    <h3 className="heading1">Messages</h3> 
    <div className='line1'></div>  
<div className="containerm">

  <div className="messages">
   {
    loading?(
      <div>Loading...</div>
    ):(
     <Layout className="layout">
      
      <List
            itemLayout="horizontal"
            dataSource={messages1.data.messages.data}
            renderItem={user => (
                <List.Item onClick={()=>{
                  setSelectedD(user);
                }}>
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatarUrl} />}
                        title={user.attributes.From} 
                        description ={user.attributes.Date.toString().slice(11, 16)}
                    />
                </List.Item>
            )}
        />
      </Layout> 
    )
   }
  </div>
  {selectedD?
  <div className='selectedM'>
  <div className='selectedC'>
  <FontAwesomeIcon icon={faCircleXmark} className='cross' onClick={()=>{
    setSelectedD(null);
  }}/>
   <div className='date'>{selectedD.attributes.Date.toString().slice(8, 10) + selectedD.attributes.Date.toString().slice(4, 8) + selectedD.attributes.Date.toString().slice(0, 4)}</div>
   <div className='selectedN'>{selectedD.attributes.From} sent you a feedback.</div>
   <div className='sType'>Type <FontAwesomeIcon icon={faAngleDoubleRight}/> {selectedD.attributes.Type}</div>
   <div className='sfeed'>{selectedD.attributes.Feedback}</div>
   <div className='stime'>{selectedD.attributes.Date.toString().slice(11, 16)}</div>
  </div>
  </div>: <div></div>}
</div>

</div>
</div>

    
  )
}

export default Message
