const Subtitle = require("../Models/Subtitle");
const course= require("../Models/Course");
const mongoose = require('mongoose');


function getAllSubtitles (req,res) {
    Subtitle.find({}).then (function (Subtitle) {
    res.status(200).json(Subtitle)
    });
};

//add subtitle
function addSubtitle (req,res) {
    const {Course,Title,Question,Answer,Video,Duration,Preview} = req.body;
    const newExcercise={Question,Answer};
    const newSubtitle = new Subtitle({
        Course,
        Title,
        Exercise:newExcercise,
        Video,
        Duration,
        Preview
    }); 
    newSubtitle.save();
    //add subtitle to course
    course.findOneAndUpdate({_id:
        mongoose.Types.ObjectId(Course)},{$push:{CourseSubtitle:newSubtitle._id}})
        .then(function (course) {
        res.status(200).json(course)
    });
};

//delete subtitle
function deleteSubtitle (req,res) {
    const subId = req.query.id;
    Subtitle.findOneAndDelete({_id:mongoose.Types.ObjectId(subId)}).then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//delete subtitle from course
function deleteSubtitleFromCourse (req,res) {
    const subId = req.query.id;
    const courseId = req.query.courseId;
    Subtitle.findOneAndDelete({_id:mongoose.Types.ObjectId(subId)}).then(function (Subtitle) {
        course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)},{$pull:{CourseSubtitle:subId}})
        .then(function (course) {
        res.status(200).json(course)
    });
    });
};

//find subtitle by id
// function findSubtitleByCourse (req,res) {
//     const courseId = req.query.id;
//     const resCourse =  Course.findOne({_id:mongoose.Types.ObjectId(courseId)});

// };

//add excercise
function addExcercise (req,res) {
    const subId=req.query.id;
    const {Question,Answer} = req.body;
    const newExcercise={Question,Answer};
    Subtitle.findOneAndUpdate({_id:
        subId},{$push:{Exercise:newExcercise}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//delete excercise
function deleteExcercise (req,res) {
    const subId=req.query.id;
    const {Question,Answer} = req.body;
    const ex={Question,Answer};
    Subtitle.findOneAndUpdate({_id:
        subId},{$pull:{Exercise:ex}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//remove all excercises
function removeAllExcercises (req,res) {
    const subId=req.query.id;   
    Subtitle.findOneAndUpdate({_id:
        subId},{$set:{Exercise:[]}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//remove all subtitles from course
function removeAllSubtitles (req,res) {
    const courseId=req.query.id;
    course.findOneAndUpdate({_id:
        courseId},{$set:{CourseSubtitle:[]}})
        .then(function (course) {
        res.status(200).json(course)
    });
};

//get course's subtitles' videos
const getCourseSubtitlesVideos = async (req,res) => {
    const courseId=req.query.id;
   const resSubtitle = await Subtitle.find({Course:courseId});
   resVideos=[];
   for (let i=0;i<resSubtitle.length;i++){
       resVideos.push(resSubtitle[i].Video);
   }
    res.status(200).json(resVideos);

};

//get subtitles excercises by course
const getCourseSubtitlesExcercises = async (req,res) => {
    const courseId=req.query.id;
    const resSubtitle = await Subtitle.find({Course:courseId});
    resExcercises=[];
    for (let i=0;i<resSubtitle.length;i++){
        resExcercises.push(resSubtitle[i].Exercise);
    }
    res.status(200).json(resExcercises);
};

    

module.exports = {getAllSubtitles,addSubtitle,addExcercise,deleteExcercise,removeAllExcercises,
    deleteSubtitle,deleteSubtitleFromCourse,removeAllSubtitles,getCourseSubtitlesVideos,getCourseSubtitlesExcercises};