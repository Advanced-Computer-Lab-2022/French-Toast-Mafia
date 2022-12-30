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
    logout,videoProgress, userRefund,getUserProgress,
    userProgressDecrement,
    sendCertificate,getUserGrades}= require ("../Controller/user-controller");

    
 

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

router.put('/userProgressDecrement',userProgressDecrement);

router.get('/sendCertificate',sendCertificate);

router.get('/getUserGrades',getUserGrades);





module.exports=router;