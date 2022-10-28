const mongoose = require('mongoose');
const instructorModel = require("../Models/Instructor");
const courseModel = require("../Models/Course");

//View all instructors
const getAllInstructors = async (req, res) => {

    const instructors = await instructorModel.find({}).sort({createdAt: -1})
  
    for (let index = 0; index < instructors.length; index++) {
        const element = instructors[index];
        console.log(element.id);
    }
    res.status(200).json(instructors)
  };




//Creating a Course
const addCourse = async(req , res) => {
    //fill in all the required course details (that an instructor should fill when creating it)
   
    //Uncomment this bit to delete a specific course

    // try{
    
    // courseModel.deleteMany({ NameOfCourse: 'PleaseWork' }, function (err) {
    //     if(err) console.log(err);
    //     console.log("Successful deletion");
    //   });

    const Instructor = req.params.id;
   
   //check if the Instructor exists first (this check will probably be removed when authentication is implemented)
   const result = await instructorModel.findOne({_id:mongoose.Types.ObjectId(Instructor)});
   if(result !== null){
        try{
    
            // get the details from the body of the request
            const{NameOfCourse,
                CourseSubtitle,
                Summary,
                Subject,
                LevelOfCourse,
                Cost} = req.body;
            
            const course = await courseModel.create(
                {NameOfCourse,
                CourseSubtitle,
                Instructor,
                LevelOfCourse,
                Summary,
                Subject,
                Cost});
        
            res.status(200).json(result);
            
        
        }catch(error){
            res.status(400).json({error:error.message})
        }

   } else{
    res.status(400).json({error:"Please enter a valid Instructor Id"});
}
    
}




module.exports = {getAllInstructors, addCourse};

