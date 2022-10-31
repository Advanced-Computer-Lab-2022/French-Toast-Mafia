import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import './App.css';


import Navbar from './Components/Navbar';
import FrontPage from './pages/FrontPage';
import AllCoursesInfo from './Components/AllCoursesInfo';
import CourseInfoPage from './pages/CourseInfoPage';
import CoursePricePage from './pages/CoursePricePage';
import AddCoursePage from './pages/AddCoursePage';

function App(){

  return (
  <div>
   <BrowserRouter>

   <Navbar/>
   <div className='pages'> 
   <Routes>
    <Route exact path='/' element={<FrontPage/>}/>
    <Route exact path='/CourseInfoPage' element={<CourseInfoPage/>}/>
    <Route exact path='/CoursePricePage' element={<CoursePricePage/>}/>
    <Route exact path='/AddCoursePage' element={<AddCoursePage/>}/>
   </Routes>
   </div>
   </BrowserRouter>
  </div>
  );
}


export default App;