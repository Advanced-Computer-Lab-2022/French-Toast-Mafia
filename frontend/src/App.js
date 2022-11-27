import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

import Navbar from './Components/Navbar';
import FrontPage from './Pages/FrontPage';
import Courses from './Pages/Courses';
import ViewMyCoursesInstructor from './Pages/ViewMyCoursesInstructor';
import EditCourseInstructor from './Pages/EditCourseInstructor';
import CoursePricePage from './Pages/CoursePricePage';
import AddCoursePage from './Pages/AddCoursePage';
import Add from './Components/Add'
import Home from './Components/Home'
import Add1 from './Components/Add1'
import Add2 from './Components/Add2'
import SignUp from './Components/SignUp'
import { Router,Link  } from "react-router-dom";
//import { FaStar } from "react-icons/fa";
//import StarRating from './Components/StarRating';
import UserAdded from './Components/UserAdded';
import AdminAdded from './Components/AdminAdded';
import InstrAdded from './Components/InstrAdded';
import AddCourse from './Components/AddCourse';
import Profile from './Pages/Profile';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Pages/ChangePassword';
import InstrRating from './Pages/InstrRating';
import MyCourses from './Components/MyCourses';

function App(){
  const newAdmin = (admin) => {
    console.log(admin);

  }

  return (
    
  <div>
   <BrowserRouter>

   <Navbar/>
   <div className='pages'> 
   <Routes>
    <Route exact path='/' element={<FrontPage/>}/>
    <Route exact path='/Courses' element={<Courses/>}/>
    <Route exact path='/CoursePricePage' element={<CoursePricePage/>}/>
    <Route exact path='/AddCoursePage' element={<AddCoursePage/>}/>
    <Route exact path='/SignUp' element={<SignUp/>}/>
    <Route exact path='/Home' element={<Home/>}/>
    <Route path="/addadmin" element={ <Add2/>} />
    <Route path="/addinstr" element={ <Add/>} />
    <Route path="/adduser" element={ <Add1/>} />
    {/* <Route path="/rate" element={ <StarRating/>} /> */}
    <Route path="editCourse" element={<EditCourseInstructor/>} />
    <Route path="/ViewMyCoursesInstructor" element = {<ViewMyCoursesInstructor/>} />
    <Route path="/UserAdded" element={ <UserAdded/>} />
    <Route path="/AdminAdded" element={ <AdminAdded/>} />
    <Route path="/InstrAdded" element={ <InstrAdded/>} />
    <Route path="/AddCourse" element={ <AddCourse/>} />
    <Route path="/Profile" element={<Profile/>}/>
    <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
    <Route path="/ChangePassword" element={<ChangePassword/>}/>
    <Route path="/MyCourses" element={ <MyCourses/>} />
    <Route path="/InstrRating" element={<InstrRating/>}/>



   </Routes>
   </div>
   </BrowserRouter>
  </div>
  )
};


export default App;