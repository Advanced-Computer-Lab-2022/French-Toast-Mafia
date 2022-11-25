const express= require("express");


const { getAllInstructors,
        selectCountryInstructor,
        addCourse ,
        filterCourseSubjcet ,
        filterCourseCost ,
        ViewMyCourses ,
        SearchCourse,viewInstrInfo
    ,changeInstrPassword }= require ("../Controller/instructor-controller");


const router = express.Router();


router.get("/",getAllInstructors );

router.post('/addCourse/:id', addCourse);

router.post('/selectCountryInstr/:id', selectCountryInstructor);

router.get ('/ViewMyCourses/:id',ViewMyCourses);

router.get ('/filterCourseSubject/:id',filterCourseSubjcet);

router.get ('/filterCourseCost/:id',filterCourseCost) ; 

router.get ('/SearchCourse/:id',SearchCourse);

router.get ('/viewInstrInfo',viewInstrInfo);

router.put ('/changeInstrPassword',changeInstrPassword);



module.exports=router;