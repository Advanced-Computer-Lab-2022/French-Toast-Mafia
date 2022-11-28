const express= require("express");


const {createInstructor, getAllInstructors,
        selectCountryInstructor, addCourse ,
        filterCourseSubjcet ,
        filterCourseCost ,
        ViewMyCourses ,
        SearchCourse, viewInstrInfo, 
        editBiography, editEmail ,
         ViewMyRatings, ViewMyReview,
         addExam}= require ("../Controller/instructor-controller");


const router = express.Router();


router.get("/",getAllInstructors );

router.post('/addCourse', addCourse);

router.post('/createInstructor', createInstructor);

router.post('/selectCountryInstr/:id', selectCountryInstructor);

router.post('/addExam', addExam);

router.put('/editInstrBiography/:id', editBiography);

router.put('/editInstrEmail/:id', editEmail);

router.get ('/ViewMyCourses/:id',ViewMyCourses);

router.get ('/ViewMyRatings',ViewMyRatings);

router.get ('/ViewMyReview/:id',ViewMyReview);

router.get ('/filterCourseSubject/:id',filterCourseSubjcet);

router.get ('/filterCourseCost/:id',filterCourseCost) ; 

router.get ('/SearchCourse/:id',SearchCourse);

router.get ('/viewInstrInfo',viewInstrInfo);




module.exports=router;