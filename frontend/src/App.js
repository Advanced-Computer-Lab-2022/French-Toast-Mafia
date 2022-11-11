import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

import Navbar from './Components/Navbar';
import FrontPage from './Pages/FrontPage';
import CourseInfoPage from './Pages/CourseInfoPage';
import CoursePricePage from './Pages/CoursePricePage';

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
   </Routes>
   </div>
   </BrowserRouter>
  </div>
  );
}


export default App;