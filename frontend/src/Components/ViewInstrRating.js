import React from 'react'
import PropTypes from 'prop-types'
import {Link,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios'


const ViewInstrRating = ({Rating}) => {
  
  
  const navigate=useNavigate();
  const[showRating,setShowRating]=useState(false);
 
  const onClick=(e)=>{
    console.log(Rating);
    setShowRating(true);
    // navigate('/CoursePricePage',{cost:price});
  }
 
  
  return (
      <div className='viewRating'>
          <button showRating={Rating} 
          onClick={onClick}>
              View Instructor Rating</button>

           {showPrice &&
           (<div>
            <span className='courses-info'>{Rating}</span>
             </div>)}
               
      </div>
  );

  }


export default ViewInstrRating