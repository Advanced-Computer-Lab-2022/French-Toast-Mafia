const express= require("express");
const {getAllUser,
    viewCourseTitleHoursRating,
    viewCoursePrice,
    selectCountryUser,
    addCourse,
    ChangeCurrencyUser}= require ("../Controller/user-controller");


const router = express.Router();

router.get("/",getAllUser );

router.get('/viewcoursetitlehoursrating',viewCourseTitleHoursRating);

router.get('viewcourseprice/:id',viewCoursePrice);

router.post ('/selectCountry/:id', selectCountryUser);

router.post('/addCourse/:id', addCourse);



module.exports=router;