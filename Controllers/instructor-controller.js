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

    // courseModel.deleteOne({ NameOfCourse: 'TestCourseName' }, function (err) {
    //     if(err) console.log(err);
    //     console.log("Successful deletion");
    //   });


    // get the details from the body of the request
    const{NameOfCourse,
        InstructorId,
        CourseSubtitle,
        Summary,
        Subject,
        LevelOfCourse,
        Cost} = req.body;
    try{
        const course = await courseModel.create(
            {NameOfCourse,
            InstructorId,
            CourseSubtitle,
            Summary,
            Subject,
            LevelOfCourse,
            Cost});
       
        res.status(200).json(course);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}




module.exports = {getAllInstructors, addCourse};

