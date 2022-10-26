const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='mongodb+srv://admin:Mayar2611@db.ntawmzm.mongodb.net/?retryWrites=true&w=majority';

const app= express();
const port= process.env.PORT || "5000" ;
const user= require('./Models/User');
const admin= require('./Models/Admin');
const Instructor= require('./Models/Instructor');
const course= require('./Models/Course');

const getAllUser = require ("./Controllers/user-controller");
const getAllAdmin = require ("./Controllers/admin-controller");
const {getAllInstructors , addCourse} = require("./Controllers/instructor-controller");
const getAllCourses = require ("./Controllers/course-controllers");

// THIS IS NEEDED TO PARSE THE BODY OF A RESPONSE AKA res.body
app.use(express.json());

mongoose.connect(MongoURI).then (()=> {

            console.log("mongoDB is now connected")
            app.listen(port, () => {
                console.log(`listening to requests on http://localhost:${port}`);
            })
        })
        .catch((err) => console.log(err));

    //Admin Pages
    app.get('/adminList', getAllAdmin);

    //Course Pages
    app.get('/courseList', getAllCourses);
    
    //Instructor Pages
    app.get('/instructorList', getAllInstructors);
    // app.post('/addCourse:id', addCourse);
    app.post('/addCourse', addCourse);

    //User Pages
    app.get('/userList', getAllUser);

    app.use(express.json())
    app.post('/adduser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    })




       
