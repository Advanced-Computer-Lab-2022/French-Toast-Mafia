const express= require("express");
const {User, validate }= require("../Models/User");

const {getAllUser,
    viewCourseTitleHoursRating,
    viewCoursePrice,
    selectCountryUser,
    ChangeCurrencyUser,
   addCourse, viewMyInfo,ViewMyCourses,
   changePassword,sendPassChangeMail,
<<<<<<< HEAD
   removeCourse,  
    logout,videoProgress, userRefund}= require ("../Controller/user-controller");
=======
   removeCourse, signUp, 
   login, logout,videoProgress,getUserProgress}= require ("../Controller/user-controller");
>>>>>>> 4f0a1013af9c726a22b26d0196ab89fc4ccbffa5

const router = express.Router();

router.get("/getAllUser",getAllUser );

router.get('/viewcoursetitlehoursrating',viewCourseTitleHoursRating);

router.get('viewcourseprice/:id',viewCoursePrice);

router.post ('/selectCountry/:id', selectCountryUser);

router.get('/viewMyInfo',viewMyInfo);

router.get('/ViewMyCourses',ViewMyCourses);

router.get('/logout', logout);

router.put('/changePassword',changePassword);

router.post('/addCourse', addCourse);

router.post('/sendPassChangeMail',sendPassChangeMail);

router.put('/removeCourse',removeCourse);

router.post ('/userRefund', userRefund);

// router.post('/login', login);

router.post('/videoProgress',videoProgress);

router.get('/getUserProgress',getUserProgress);



module.exports=router;