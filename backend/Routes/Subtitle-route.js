const express= require("express");

const router = express.Router();

const {getAllSubtitles,addSubtitle,addExcercise,deleteExcercise,removeAllExcercises,
    deleteSubtitle,deleteSubtitleFromCourse,removeAllSubtitles,getCourseSubtitlesVideos,getCourseSubtitlesExcercises} = require('../Controller/subtitle-controller');

router.get('/getAllSubtitles',getAllSubtitles);

router.post('/addSubtitle',addSubtitle);

router.post('/addExcercise',addExcercise);

router.post('/deleteExcercise',deleteExcercise);

router.post('/removeAllExcercises',removeAllExcercises);

router.get('/deleteSubtitle',deleteSubtitle);

router.get('/deleteSubtitleFromCourse',deleteSubtitleFromCourse);

router.get('/removeAllSubtitles',removeAllSubtitles);

router.get('/getCourseSubtitlesVideos',getCourseSubtitlesVideos);

router.get('/getCourseSubtitlesExcercises',getCourseSubtitlesExcercises);

module.exports=router;
