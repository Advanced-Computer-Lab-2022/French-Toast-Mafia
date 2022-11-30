import PropTypes from 'prop-types'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React, {useState,useEffect} from 'react';

//components
import ViewAllCoursesButton from '../Components/ViewAllCoursesButton'
import CountriesDropdown from '../Components/CountriesDropdown'
// import StarRating from '../Components/StarRating';
import ViewExam from '../Components/ViewExam';



const FrontPage = () => {
    
  

  return (
      <div>
        
          <header className='home'>
              <ViewAllCoursesButton/>
           
          </header>
          <header className='app'>

          <CountriesDropdown/>
         //<ViewExam/>

          </header>
         
          </div>
  )
}


export default FrontPage