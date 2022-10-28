const user=require("../Models/User");
const course=require("../Models/Course");


function getAllUser (req,res) {
    user.find({}).then (function (user) {
    res.send(user);
    });
};

//maryam functions

//Requirement 7 --> View Course Title, Hours, Rating
const viewCourseTitleHoursRating = async (req, res) => {
    const a = await course.find({}, { NameOfCourse: 1, Duration: 1, Rating: 1, _id: 0 });
    if (a == null) {
        res.status(404).send('no courses available');
    }
    else {
        res.json(a);
    }
};

//Requirement 8 --> View Course Price (Individual Trainee)
    const viewCoursePrice = async (req, res) => {
        //user type must be individual trainee 
        const t = await user.find({}, { Type: "Corporate Trainee" });
        if (t == null) {
            const courseID = req.params.id;
            try {
                const c = await course.findById(courseID, { Cost: 1, _id: 0 });
                res.status(200).json(c)
            }
            catch (error) {
                res.status(400).json({ error: error.message })
            }
        }
        else {
            res.status(404).send('Price is not Available');
        }
    };


module.exports = {getAllUser,viewCourseTitleHoursRating,viewCoursePrice};

