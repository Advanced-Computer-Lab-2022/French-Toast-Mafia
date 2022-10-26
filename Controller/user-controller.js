const user=require("../Models/User");
const course=require("../Models/Course");


function getAllUser (req,res) {
    user.find({}).then (function (user) {
    res.send(user);
    });
}
// Model.find(userId: req.params.userId

//view all the titles of the courses available including the total hours of the course and course rating
function viewCourseTitleHoursRating (req,res) {
    course.find({TitleOfCourse,TotalHours,CourseRating}).then (function (course) {
    res.send(course);
    });
}
//view the price of each course
function viewCoursePrice (req,res) {
    //check user type if its corporate or not
    if (user.type!="corporate") {
    course.find({Price}).then (function (course) {
    res.send(course);
    });
}
else {

    res.send("You are not allowed to view the price of the course");
}


}
module.exports= {getAllUser,viewCourseTitleHoursRating,viewCoursePrice};

