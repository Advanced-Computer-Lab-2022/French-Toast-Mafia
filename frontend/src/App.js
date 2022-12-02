import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';


import Navbar from './Components/Navbar';
import FrontPage from './Pages/FrontPage';
import Courses from './Pages/Courses';
import ViewMyCoursesInstructor from './Pages/ViewMyCoursesInstructor';
import EditCourse from './Pages/EditCourse';
import ViewCourse from './Pages/ViewCourse';
import CoursePricePage from './Pages/CoursePricePage';
import AddCourse from './Pages/AddCourse';
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
// import AddCourse from './Components/AddCourse';
import Profile from './Pages/Profile';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Pages/ChangePassword';
import MyCourses from './Components/MyCourses';
import CoursePromotion from './Pages/CoursePromotion';
import AllUsers from './Components/AllUsers';
import AllInstructors from './Components/AllInstructors';
import UserCoursePage from './Pages/UserCoursePage';
import ViewCourseSubtitles from './Pages/ViewCourseSubtitles'
import ViewSubtitle from './Pages/ViewSubtitle';
import EditSubtitle from './Pages/EditSubtitle';
import ViewCourseExam from './Pages/ViewCourseExam'
import CourseInstructor from './Pages/CourseInstructor';
import StarRating from './Components/StarRating';
import CourseRate from './Pages/CourseRate';
import Contract from './Pages/Contract';
import InstrCourses from './Components/InstrCourses';
import EditInfo from './Pages/EditInfo';
import InstrInfo from './Pages/InstrInfo';
import EditBiography from './Pages/EditBiography';
// import AddExam from './Components/addExam';
import ViewExam from './Components/ViewExam';
import CourseVideos from './Pages/CourseVideos';
import CourseExercises from './Pages/CourseExercises';
import ViewExamAnswer from './Components/ViewExamAnswer';
import ViewExamButton from './Components/ViewExam';
import ExamIsDone from './Components/ExamIsDone';
import CourseInfoAllUsers from './Pages/CourseInfoAllUsers';
import ViewCourseRating from './Pages/viewCourseRatings';

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
    <Route exact path='/AddCourse' element={<AddCourse/>}/>
    <Route exact path='/SignUp' element={<SignUp/>}/>
    <Route exact path='/Home' element={<Home/>}/>
    <Route path="/addadmin" element={ <Add2/>} />
    <Route path="/addinstr" element={ <Add/>} />
    <Route path="/adduser" element={ <Add1/>} />
    {/* <Route path="/rate" element={ <StarRating/>} /> */}
    <Route path="/viewCourse" element={<ViewCourse/>} />
    <Route path="/viewCourse/Subtitles" element={<ViewCourseSubtitles/>} />
    <Route path="/viewSubtitle" element={<ViewSubtitle/>} />
    <Route path="/editSubtitle" element={<EditSubtitle/>}/>
    <Route path="/viewCourse/Exam" element={<ViewCourseExam/>} />
    <Route path="/viewCourse/Rating" element={<ViewCourseRating/>} />
    <Route path="/Instructor/viewMyCourses" element = {<ViewMyCoursesInstructor/>} />
    <Route path="/Instructor/EditCourse" element = {<EditCourse/>}/>
    <Route path="/UserAdded" element={ <UserAdded/>} />
    <Route path="/AdminAdded" element={ <AdminAdded/>} />
    <Route path="/InstrAdded" element={ <InstrAdded/>} />
    {/* <Route path="/AddCourse" element={ <AddCourse/>} /> */}
    <Route path="/Profile" element={<Profile/>}/>
    <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
    <Route path="/ChangePassword" element={<ChangePassword/>}/>
    <Route path="/MyCourses" element={ <MyCourses/>} />
    <Route path="/AllUsers" element={ <AllUsers/>} />
    <Route path="/AllInstructors" element={ <AllInstructors/>} />
    <Route path="/UserCoursePage" element={ <UserCoursePage/>} />
    <Route path="/CoursePromotion" element={<CoursePromotion/>}/>
    <Route path="/CourseInstructor" element={<CourseInstructor/>}/>
    <Route path="/CourseRate" element={<CourseRate/>}/>
    <Route path="/CourseVideos" element={<CourseVideos/>}/>
    <Route path="/CourseExercises" element={<CourseExercises/>}/>
    {/* <Route path="/addExam" element={<AddExam/>}/> */}
    <Route path="/ViewExam" element={<ViewExam/>}/>

    <Route path="/Contract" element={<Contract/>}/>
    <Route path="/InstrCourses" element={ <InstrCourses/>} />
    <Route path="/EditInfo" element={ <EditInfo/>} />
    <Route path="/InstrInfo" element={ <InstrInfo/>} />
    <Route path="/EditBiography" element={ <EditBiography/>} />
    <Route path="/ViewExamAnswer" element={ <ViewExamAnswer/>} />
    <Route path="/ViewExamButton" element={ <ViewExamButton/>} />
    <Route path="/ExamIsDone" element={ <ExamIsDone/>} />

    <Route path="/CourseInfoAllUsers" element={ <CourseInfoAllUsers/>} />


   </Routes>
   </div>
   </BrowserRouter>
  </div>
  )
};


export default App;