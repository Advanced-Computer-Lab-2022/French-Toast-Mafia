const express= require("express");
// const cookieParser = require('cookie-parser');


const {getAllUser,
    viewCourseTitleHoursRating,
    viewCoursePrice,
    selectCountryUser,
    ChangeCurrencyUser,
   addCourse, viewMyInfo,ViewMyCourses,
   changePassword,sendPassChangeMail,
   removeCourse, signUp, 
   login, logout}= require ("../Controller/user-controller");

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

router.post ('/signUp', signUp);

router.post('/login', login);


module.exports=router;