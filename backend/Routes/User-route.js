const express= require("express");
const {User, validate }= require("../Models/User");

const {getAllUser,
    viewCourseTitleHoursRating,
    viewCoursePrice,
    selectCountryUser,
    ChangeCurrencyUser,
   addCourse, viewMyInfo,ViewMyCourses,
   changePassword,sendPassChangeMail,
   removeCourse,  
<<<<<<< HEAD
    logout,videoProgress, userRefund,getUserProgress}= require ("../Controller/user-controller");

=======
    logout,videoProgress, userRefund, getUserProgress}= require ("../Controller/user-controller");
 
>>>>>>> 2fe8851eb98efb5451c3643130b29889e98a7e67

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

// router.get('/getUserProgress',getUserProgress);



module.exports=router;