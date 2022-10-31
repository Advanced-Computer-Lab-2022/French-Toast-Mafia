const instructor=require("../Models/Instructor");
const course=require("../Models/Course");
var mongoose = require('mongoose');

function getAllInstructors (req,res) {
    instructor.find({}).then (function (instructor) {
    res.send(instructor);
    });
};

//Requirement 6 -->Select Country
const selectCountryInstructor = async (req, res) => {
    
    const userID = req.params.id;
    const {InstrCountry} = req.body;
    const json='{"InstrCountry":"'+InstrCountry+'"}';
    const obj = JSON.parse(json);
    const newCountry=obj.InstrCountry;

    try{
        const u = await instructor.findByIdAndUpdate(userID, {InstrCountry:newCountry}, {new:true});
        res.status(200).json(u)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    console.log(newCountry);
    return newCountry;
};

//Requirement 23 --> add a new course
const addCourse = async(req , res) => {
    //fill in all the required course details (that an instructor should fill when creating it)

    const instructorId = req.params.id;
   
   //check if the Instructor exists first (this check will probably be removed when authentication is implemented)
   const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instructorId)});
   if(result !== null){
        try{

            //Uncomment this block to delete a course
            /*
            course.deleteOne({ NameOfCourse: 'FinallyWorking' }, function (err) {
                if(err) console.log(err);
                console.log("Successful deletion");
              });
            */

            // get the details from the body of the request
            const{NameOfCourse,
                CourseSubtitle,
                Summary,
                Subject,
                LevelOfCourse,
                Cost} = req.body;

            //create the course
            const createdCourse = await course.create(
                {NameOfCourse,
                CourseSubtitle,
                Instructor: instructorId,
                LevelOfCourse,
                Summary,
                Subject,
                Cost});
    
            //adds the course id to the instructor's courses given array
            await instructor.findByIdAndUpdate(instructorId,{$push:{CourseGiven: createdCourse._id}});

            //in case you need to remove a course (1 removes the last element in the array)
            // await instructor.findByIdAndUpdate(instructorId,{$pop: { CourseGiven: 1 }});
             
            res.status(200).json(createdCourse);
            
        
        }catch(error){
            res.status(400).json({error:error.message})
        }

   } else{
    res.status(400).json({error:"Please enter a valid Instructor Id"});
}
    
}



module.exports={getAllInstructors , selectCountryInstructor , addCourse};
   