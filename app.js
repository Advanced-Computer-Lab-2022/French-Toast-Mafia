const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='';

const app= express();
const port= process.env.PORT || "5000" ;
const user= require('./Models/User');
const admin= require('./Models/Admin');
const Instructor= require('./Models/Instructor');
const course= require('./Models/Course');

const getAllAdmin= require ("./Controller/admin-controller");
const getAllCourse= require ("./Controller/course-controllers");

//maryam functions importing from user-controller.js
//const selectCountry= require ("./Controller/user-controller");
//const selectCount=require("./views/SelectCountry");
 const {getAllUser,viewCourseTitleHoursRating,viewCoursePrice}= require ("./Controller/user-controller");



mongoose.connect("mongodb+srv://admin:Mayar2611@db.ntawmzm.mongodb.net/?retryWrites=true&w=majority"
        )
        .then (()=> {
            console.log("mongoDB is now connected")
            app.listen(5000, () => {
                console.log('listening to requests on http://localhost:5000')
            })
        })
        .catch((err) => console.log(err));

    app.get('/courselist', getAllCourse);
  //  app.get('/instructorlist', getAllInstructor);
    //app.get('/userlist', getAllUser);

    //maryam functions
    //app.get('/selectcountry', selectCount);
     app.get('/viewcoursetitlehoursrating', viewCourseTitleHoursRating);
     app.get('/viewcourseprice/:id', viewCoursePrice);

    app.use(express.json())
    app.post('/adduser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    });

    app.get('/adminlist', getAllAdmin);



       
