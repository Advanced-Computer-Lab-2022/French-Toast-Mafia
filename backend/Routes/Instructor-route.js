const express= require("express");


const {createInstructor, getAllInstructors,
        selectCountryInstructor, addCourse ,
        deleteCourse, addInstructorName,
        filterCourseSubjcet ,
        filterCourseCost ,
        ViewMyCourses ,
        SearchCourse, viewInstrInfo, 
        editBiography, editEmail ,
        ViewMyRatings, ViewMyReview,
        createExam,
        addMCQ,
        deleteInstrRating,addInstrRating,calculateInstrRating,
         getAllMcq, addPromotion}= require ("../Controller/instructor-controller");


const router = express.Router();

router.put('/addPromotion', addPromotion);


router.get('/',getAllInstructors );

router.post('/addCourse', addCourse);

router.get('/deleteCourse', deleteCourse);

router.get('/addInstructorName', addInstructorName);

router.post('/createInstructor', createInstructor);

router.post('/selectCountryInstr/:id', selectCountryInstructor);

router.post('/addExam', createExam);

router.post ('/addMCQ',addMCQ);

router.put('/editInstrBiography', editBiography);

router.put('/editInstrEmail', editEmail);

router.put('/addPromotion', addPromotion);

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