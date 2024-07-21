import React from 'react'
import './Home.css'
import logo from '../Assets/logo.png'
import  feedback from '../Assets/feedback.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleRight, faBars, faMessage, faSearch, faTrophy} from '@fortawesome/free-solid-svg-icons';
import { faComment, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery, gql } from '@apollo/client';
import client from '../../utils/apolloClient.js';

const F1 = gql`
query Getf1($search : String!){
  feedbacks(filters: { From: { contains: $search } }) {
    data {
      attributes {
        From
        To
        feedback
        # Other fields you want to retrieve
      }
    }
  }
  }
`
const F2 = gql`
query Getf2($search : String!){
  feedbacks(filters: { To: { contains: $search } }) {
    data {
      attributes {
        From
        To
        feedback
        # Other fields you want to retrieve
      }
    }
  }
  }
`

function Home() {
  const [slides, setSlides] = useState();
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    ); 
  }
  
const [feedback, setFeedback] = useState([]);
const [search , setSearch] = useState('');
const {loading: loading1,error: error1, data:data1 } = useQuery(F1, {
  variables: { search: search },
});
const { loading:loading2, error:error2, data:data2 } = useQuery(F2, {
  variables: { search: search },
});

  useEffect(()=>{
    axios
    .get("http://localhost:1337/api/Feedbacks")
    .then(({data})=>setFeedback(data.data))
    .catch((error)=>console.log(error));
    setSlides(feedback.length)
  }, []);
  const info = useLocation();
  const name=info.state.name;
  const navigate = useNavigate();
 {/*} var settings = {
    dots: true,
    infinite : ,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />
  };*/}
  const feedf=()=>{
    navigate('Feedback',{state:{name:name}})
  }
  const handleSearch= async (e) => {
    setSearch(e);
    if(data1 && data2){
if(data1.feedbacks.data && data2.feedbacks.data){
    const combined = [...data1.feedbacks.data, ...data2.feedbacks.data];
    setFeedback(combined)
    setSlides(combined.length)
    console.log(slides)
  }}
  else if(data1){
    if(data1.feedbacks.data){
      setFeedback(data1.feedbacks.data)
      setSlides(data1.feedbacks.data.length)
    }
  }
  else if(data2){
    if(data2.feedbacks.data){
      setFeedback(data2.feedbacks.data)
      setSlides(data2.feedbacks.data.length)

    }
  }
  else{
    console.log("nothing is matching")
  }
  };
  return (
    <div>
    <div className="hheader">
      {/*<img src={logo} className='logo1'/>*/}
     <h4 className='timeline'>Timeline</h4>
     <h4 className="name">{name}</h4>
    </div>
    <div className="hbody">
    <h3 className='welcome'>Welcome Back <span className='name2'>{name}</span> !</h3>
    <h3 className="heading">Timeline</h3>
    <div className='line'></div>
    <div className ="input-wrapper">
    <FontAwesomeIcon icon={faSearch} className="search-icon"  />
    <input placeholder='Type to Search...' className="search-bar" value={search} 
     onChange={(e)=>
      handleSearch(e.target.value)}/>
    </div>
    <div className="slider">
    <Slider dots={true}  infinite ={slides>=3} slidesToShow={slides === 2? 2: 3} slidesToScroll={1} nextArrow= {<SampleNextArrow />}
    prevArrow= {<SampleNextArrow />} className="slide">
 {feedback.map((f)=>(
  <div className="card1">
    <h2><FontAwesomeIcon icon={faTrophy} className="trophy" /> Appreciation</h2>
    <h6 className="from"> {f.attributes.From} <FontAwesomeIcon icon={faAngleDoubleRight}/>
      {f.attributes.To}</h6>
    <p>
      {f.attributes.feedback}
    </p>
    
  </div>
 )
 )}</Slider>
 </div>
    </div>
    </div>
  )
}

export default Home
