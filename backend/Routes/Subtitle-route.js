const express= require("express");

const router = express.Router();

const {getAllSubtitles,addSubtitle, editSubtitle, addExcercise,deleteExcercise,removeAllExcercises, viewSubtitle,
    deleteSubtitle,deleteSubtitleFromCourse,removeAllSubtitles,getCourseSubtitlesVideos,getCourseSubtitlesExcercises} = require('../Controller/subtitle-controller');

router.get('/',getAllSubtitles);

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

module.exports=router;
