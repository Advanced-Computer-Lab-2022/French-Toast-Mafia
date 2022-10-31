const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='';
const cors=require('cors');

const app= express();
const port= process.env.PORT || "5000" ;
app.use(express.json());
app.use(cors());

const user= require('./Models/User');
const admin= require('./Models/Admin');
const Instructor= require('./Models/Instructor');
const course= require('./Models/Course');

const getAllAdmin= require ("./Controller/admin-controller");
const getAllCourse= require ("./Controller/course-controllers");

//maryam functions importing from user-controller.js
//const selectCountry= require ("./Controller/user-controller");
//const selectCount=require("./views/SelectCountry");
const {getAllUser,viewCourseTitleHoursRating,viewCoursePrice,selectCountryUser,ChangeCurrency}= require ("./Controller/user-controller");
const {getAllInstructors,selectCountryInstructor,ViewMyCourses}= require ("./Controller/instructor-controller");


mongoose.connect("mongodb+srv://admin:Mayar2611@db.ntawmzm.mongodb.net/?retryWrites=true&w=majority"
)
    .then(() => {
        console.log("mongoDB is now connected")
        //Create an API Endpoint
        app.get("/api", (req, res) => {
            res.json({ message: "Hello from server!" });
        });


        app.listen(5000, () => {
            console.log('listening to requests on http://localhost:5000')
        })
    })
    .catch((err) => console.log(err));

    app.get('/courselist', getAllCourse);


    ///////////////////////////////////////////////////////////////////////////////////

     //maryam functions
     
     //user
     app.post('/selectCountry/:id', selectCountryUser);
     app.get('/viewcoursetitlehoursrating', viewCourseTitleHoursRating);
     app.get('/viewcourseprice/:id', viewCoursePrice);

     //Instructor
     app.post('/selectCountryInstr/:id', selectCountryInstructor);

     /////////////////////////////////////////////////////////////////////////////////
     
    app.use(express.json())
    app.post('/adduser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    });

    app.get('/adminlist', getAllAdmin);


      
       
