import React from 'react'
import PropTypes from 'prop-types'
import {Link,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios'


const ViewCoursePriceButton = ({price}) => {
  
  
  const navigate=useNavigate();
  const[showPrice,setShowPrice]=useState(false);
 
  const onClick=(e)=>{
    console.log(price);
    setShowPrice(true);
    // navigate('/CoursePricePage',{cost:price});
  }
 
  
  return (
      <div className='viewPrice'>
          <button showPrice={price} 
          onClick={onClick}>
              View Course Price</button>

           {showPrice &&
           (<div>
            <span className='courses-info'>{price}</span>
             </div>)}
               
      </div>
  );

  }


export default ViewCoursePriceButton

