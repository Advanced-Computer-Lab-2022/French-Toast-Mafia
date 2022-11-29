const express= require("express");


const {createInstructor, getAllInstructors,
        selectCountryInstructor, addCourse ,
        filterCourseSubjcet ,
        filterCourseCost ,
        ViewMyCourses ,
<<<<<<< HEAD
        SearchCourse, viewInstrInfo, 
        editBiography, editEmail ,
         ViewMyRatings, ViewMyReview,
         createExam,
         addMCQ}= require ("../Controller/instructor-controller");
=======
        SearchCourse,viewInstrInfo, 
    editBiography,
    editEmail , ViewMyRatings, ViewMyReview,deleteInstrRating,addInstrRating,calculateInstrRating,addExam}= require ("../Controller/instructor-controller");
>>>>>>> a6fb4f42c6073f6b6ff17e81491af32b04e50212


const router = express.Router();


router.get("/",getAllInstructors );

router.post('/addCourse', addCourse);

router.post('/createInstructor', createInstructor);

router.post('/selectCountryInstr/:id', selectCountryInstructor);

router.post('/addExam', createExam);

router.post ('/addMCQ',addMCQ);

router.put('/editInstrBiography/:id', editBiography);

router.put('/editInstrEmail/:id', editEmail);

router.get ('/ViewMyCourses/:id',ViewMyCourses);

router.get ('/ViewMyRatings',ViewMyRatings);

router.get ('/ViewMyReview/:id',ViewMyReview);

router.get ('/filterCourseSubject/:id',filterCourseSubjcet);

router.get ('/filterCourseCost/:id',filterCourseCost) ; 

router.get ('/SearchCourse/:id',SearchCourse);

router.get ('/viewInstrInfo',viewInstrInfo);

router.put('/deleteInstrRating',deleteInstrRating);

router.put('/addInstrRating',addInstrRating);

router.get('/calculateInstrRating',calculateInstrRating);







module.exports=router;