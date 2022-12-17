const express= require("express");


const {getAllUser,
    viewCourseTitleHoursRating,
    viewCoursePrice,
    selectCountryUser,
    ChangeCurrencyUser,
   addCourse, viewMyInfo,ViewMyCourses,changePassword,sendPassChangeMail,removeCourse}= require ("../Controller/user-controller");

const router = express.Router();

router.get("/getAllUser",getAllUser );

router.get('/viewcoursetitlehoursrating',viewCourseTitleHoursRating);

router.get('viewcourseprice/:id',viewCoursePrice);

router.post ('/selectCountry/:id', selectCountryUser);

router.get('/viewMyInfo',viewMyInfo);

router.get('/ViewMyCourses',ViewMyCourses);

router.put('/changePassword',changePassword);

router.post('/addCourse', addCourse);

router.post('/sendPassChangeMail',sendPassChangeMail);

router.put('/removeCourse',removeCourse);

module.exports=router;