import PropTypes from 'prop-types'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React, {useState,useEffect} from 'react';

//components
import ViewAllCoursesButton from '../Components/ViewAllCoursesButton'
import CourseInfoPage from './CourseInfoPage';
const FrontPage = () => {
    
  

  return (
      <div>
        <h1 className='App'>Online Learning Platform</h1>
          <header className='home'>
              <ViewAllCoursesButton/>
          </header>
         
          </div>
  )
}


export default FrontPage
