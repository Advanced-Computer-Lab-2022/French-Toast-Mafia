const express= require("express");

const router = express.Router();

const {getAllSubtitles,addSubtitle, editSubtitle, addExcercise,deleteExcercise,removeAllExcercises, viewSubtitle,
    deleteSubtitle,deleteSubtitleFromCourse,removeAllSubtitles,getCourseSubtitlesVideos,getCourseSubtitlesExcercises,
    addVideoDescription,emptySubtitlesArray,getExcercisesQuestions,
    getExcercisesAnswers,addNotes,viewAllCourseSubtitles,viewSubtitleVideo,viewSubtitleNotes} = require('../Controller/subtitle-controller');

router.get('/getAllSubtitles',getAllSubtitles);

router.post('/addSubtitle',addSubtitle);

router.post('/editSubtitle', editSubtitle);

router.post('/addExcercise',addExcercise);

router.post('/deleteExcercise',deleteExcercise);

router.post('/removeAllExcercises',removeAllExcercises);

router.get('/deleteSubtitle',deleteSubtitle);

router.get('/viewSubtitle',viewSubtitle);

router.get('/deleteSubtitleFromCourse',deleteSubtitleFromCourse);

router.get('/removeAllSubtitles',removeAllSubtitles);

router.get('/getCourseSubtitlesVideos',getCourseSubtitlesVideos);

router.get('/getCourseSubtitlesExcercises',getCourseSubtitlesExcercises);

router.post('/addVideoDescription',addVideoDescription);

router.get('/emptySubtitlesArray',emptySubtitlesArray);

router.get('/getExcercisesQuestions',getExcercisesQuestions);

router.get('/getExcercisesAnswers',getExcercisesAnswers);

router.post('/addNotes',addNotes);

router.get('/viewAllCourseSubtitles',viewAllCourseSubtitles);

router.get('/viewSubtitleVideo',viewSubtitleVideo);

router.get('/viewSubtitleNotes',viewSubtitleNotes);

module.exports=router;
