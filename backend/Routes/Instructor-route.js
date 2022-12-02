const express= require("express");


const {createInstructor, getAllInstructors,
        selectCountryInstructor, addCourse ,
        deleteCourse,
        filterCourseSubjcet ,
        filterCourseCost ,
        ViewMyCourses ,
        SearchCourse, viewInstrInfo, 
        editBiography, editEmail ,
        ViewMyRatings, ViewMyReview,
        createExam,
        addMCQ,
        deleteInstrRating,addInstrRating,calculateInstrRating, getAllMcq}= require ("../Controller/instructor-controller");


const router = express.Router();


router.get('/',getAllInstructors );

router.post('/addCourse', addCourse);

router.get('/deleteCourse', deleteCourse);

router.post('/createInstructor', createInstructor);

router.post('/selectCountryInstr/:id', selectCountryInstructor);

router.post('/addExam', createExam);

router.post ('/addMCQ',addMCQ);

router.put('/editInstrBiography', editBiography);

router.put('/editInstrEmail', editEmail);

router.get ('/ViewMyCourses',ViewMyCourses);

router.get ('/ViewMyRatings',ViewMyRatings);

router.get ('/ViewMyReview',ViewMyReview);

router.get ('/filterCourseSubject/:id',filterCourseSubjcet);

router.get ('/filterCourseCost/:id',filterCourseCost) ; 

router.get ('/SearchCourse/:id',SearchCourse);

router.get ('/viewInstrInfo',viewInstrInfo);

router.put('/deleteInstrRating',deleteInstrRating);

router.put('/addInstrRating',addInstrRating);

router.get('/calculateInstrRating',calculateInstrRating);

router.get('/getAllMcq',getAllMcq);


module.exports=router;