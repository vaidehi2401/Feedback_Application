import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Feedback.css'; import Axios from 'axios';
import feedback1 from '../Assets/feedback2.png'
import { useQuery, gql } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { Select, Option, Input } from 'antd';
import { getUserApi } from './hooks/getUserApi'


function Feedback() {
  // const { data } = getUserApi()

  const [To, setTo] = useState('Employee Names');
  const [type1, setType1] = useState('Time Management');
  const [type, setType] = useState('Appreciation');
  const [feedback, setFeedback] = useState("");
  const [data1, setData] = useState([]);
  const [email, setEmail] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [usernames, setUsernames] = useState([]);
  const [filteredO, setFilteredO] = useState();
  const { TextArea } = Input;
  const [formErrors, setFormErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [optionsf, setOptionsf] = useState([1, 2, 3]);
  const info = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const From = info.state.name;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get('http://localhost:1337/api/forms');
        setData(data?.data?.data);
      } catch (error) {
      }

      
    }
    fetchData();
  }, []);

  useEffect(()=>{
    setOptions(data1?.map(item => ({ value: item.attributes.username, label: item.attributes.username })))
    console.log(options)
    setIsLoading(false);
  },[data1])

  useEffect(() => {
    // Extract usernames only when data1 changes
    if (data1?.length > 0) {
      const usernameArray = data1.map((user) => user.attributes.username); // Extract usernames
      setUsernames(usernameArray);
    }
    console.log(usernames)
  }, [data1]);
  const fun = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1337/api/Feedbacks", {
        data: {
          From: From,
          To: To,
          feedback: feedback
        }
      }).then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })

  };
  const fun1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/messages', {
        data: {
          From: From,
          To: To,
          Feedback: feedback,
          Type: type1,
          Date: currentTime
        }
      })
      console.log("successfull");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (value) => {
    setType(value);
  }
  return (
    <div className="fbody">

      <div className="fheader">
        {/*<img src={logo} className='logo1'/>*/}
        <h4 className='timeline'>Feedback</h4>
        <h4 className="name">{From}</h4>
      </div>
      <div className="fbody">
        <h3 className="heading">Feedback</h3>
        <div className='line'></div>
        <div className="form">
          <div className="type">
            <div className="type2">
              <h6>Choose Feedback</h6>

              <Select value={type} onChange={handleChange} className="select-box">
                <Select.Option key="1" value="Appreciation"  >Appreciation</Select.Option>
                <Select.Option key="2" value="Feedback"  >Feedback</Select.Option>
              </Select>

            </div>
          </div>

          {type === "Appreciation" ? <div></div> : <div> <div className="type">
            <div className="type2">
              <h6>Choose type of Feedback</h6>
              <Select value={type1} onChange={(e) => setType1(e)} className="select-box">
                <Select.Option value="Time management">Time Management</Select.Option>
                <Select.Option value="Code Quality">Code Quality</Select.Option>
              </Select>
            </div> </div></div>}
          <div className="type">
            <div className='type2'>
              {isLoading ? (
                <p> Loading options....</p>) :

                (<><h6>Choose whom do you want to give feedback</h6>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an option"
                    optionFilterProp="label"
                    // filterOption={(e) => {
                    //   return options.filter(option => option.label.toLowerCase().indexOf(e.toLowerCase()) !== -1);
                    // }}
                    options={options}
                    onChange={(e) => { setTo(e) }}
                  /></>)}
            </div>
          </div>
          <div className="type">
            <div className="type2">
              <h6>Enter your feedback</h6>
            </div>
            <div>
              <div className="inp1">

                <TextArea style={{ width: '350px' }} rows="4" onChange={(e) => setFeedback(e.target.value)} placeholder="Enter your feedback"></TextArea>
              </div></div>
          </div>

          <div className="type">
            <div className="type3">
              {
                type === "Appreciation" ? <Button variant="primary" disabled={(!To) || (!type) || (!feedback)} onClick={fun}>Submit</Button> : <Button variant="primary" disabled={(!To) || (!type1) || (!type) || (!feedback)} onClick={fun1}>Submit</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
