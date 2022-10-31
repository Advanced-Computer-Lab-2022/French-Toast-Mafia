const instructor= require("../Models/Instructor");
const { default: mongoose } = require('mongoose');
const Course = require ("../Models/Course")

//create instructor 
const createInstructor = async(req,res) => {
    const newInstructor = new instructor ({
        InstrName: req.body.InstrName,
        InstrEmail: req.body.InstrEmail,
        InstrCountry:req.body.InstrCountry, 
        InstrPassword: req.body.InstrPassword, 
        Department:req.body.Department, 
        Biography:req.body.Biography, 
        CourseGiven:req.body.CourseGiven, 
        ProfileViews:req.body.ProfileViews, 
        PercentOrMoneyTaken:req.body.PercentOrMoneyTaken, 
        Wallet:req.body.Wallet }) 
   
        newInstructor.save()
        .then (result => res.status(200).send(result))
     
    }

//get all instructor
function getInstructor (req,res) {
    instructor.find({}).then (function (instructor) {
    res.send(instructor);
    });
}

//filter courses based on subject
const filterSubject = async (req,res) => {
   let filtersubj= {};
   if (req.body.Subject){
        filtersubj= {Subject: req.body.Subject}
   }
   const courseSubj= await Course.find(filtersubj).populate('Subject');
   if (!Course){
    res.status(404).json({success: false})
   }
   res.send(courseSubj);

}

//filter rating 
const filterRating = async (req,res) => {
    let filterRate= {};
    if (req.body.Rating){
        filterRate= {Rating: req.body.Rating}
    }
    const courseRate= await Course.find(filterRate).populate('Rating');
    if (!Course){
     res.status(404).json({success: false})
    }
    res.send(courseRate);
 
 }

 //filter price 
 const filterCost = async (req,res) => {
    let listCost= {};
    if (req.body.Cost){
        listCost= {Cost: req.body.Cost}
    }
    const filterCost= await Course.find(listCost).populate('Cost');
    if (!Course){
     res.status(404).json({success: false})
    }
    res.send(filterCost);
 
 }

 


module.exports={getInstructor,createInstructor, filterSubject, filterRating, filterCost};

   



   //.catch(err)
     //  res.status(400).json({error:error.message})
    //     const newInstructor = await instructor.create({InstrName, InstrEmail,InstrCountry,InstrPassword,Department,Biography,CourseGiven,ProfileViews,PercentOrMoneyTaken,Wallet})
    //     res.status(200).json(newInstructor)
    // }catch(