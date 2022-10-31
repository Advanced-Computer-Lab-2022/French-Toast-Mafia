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
   
    


    const Instructor = req.params.id;
   
   //check if the Instructor exists first (this check will probably be removed when authentication is implemented)
   const result = await instructorModel.findOne({_id:mongoose.Types.ObjectId(Instructor)});
   if(result !== null){
        try{

            //Uncomment this block to delete a course
            /*
            courseModel.deleteOne({ NameOfCourse: 'PleaseWork' }, function (err) {
                if(err) console.log(err);
                console.log("Successful deletion");
              });
            */

            // // get the details from the body of the request
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
    
            //adds the course id to the instructor's courses given array
            await instructorModel.findByIdAndUpdate(Instructor,{$push:{CourseGiven: course._id}},{new : true});

            //in case you need to remove a course (1 removes the last element in the array)
            // await instructorModel.findByIdAndUpdate(Instructor,{$pop: { CourseGiven: 1 }});
             
            res.status(200).json("Course Added");
            
        
        }catch(error){
            res.status(400).json({error:error.message})
        }

   } else{
    res.status(400).json({error:"Please enter a valid Instructor Id"});
}
    
}




module.exports = {getAllInstructors, addCourse};

