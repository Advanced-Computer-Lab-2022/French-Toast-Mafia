const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='';
require('dotenv').config()

const app= express();
const port= process.env.PORT || "5000" ;
const user= require('./Models/User');
const admin= require('./Models/Admin');
const Instructor= require('./Models/Instructor');
const Course= require('./Models/Course');

const getAllUser= require ("./Controller/user-controller");
const getAllAdmin= require ("./Controller/admin-controller");
const {getAllInstructor , createInstructor , filterCourseSubjcet , filterCourseCost , addCourse , ViewMyCourses , SearchCourse}  = require("./Controller/instructor-controller");

const  {getAllCourse } = require ("./Controller/course-controllers");

app.use(express.json());

mongoose.connect(process.env.Mongo_URI
        )
        .then (()=> {
            console.log("mongoDB is now connected")
            app.listen(5000, () => {
                console.log('listening to requests on http://localhost:5000')
            })
        })
        //.catch((err) => console.log(err));

    app.get('/adminlist', getAllAdmin);
    app.get('/courselist', getAllCourse);
    app.get('/instructorlist', getAllInstructor);
    app.get('/userlist', getAllUser);

    // app.post('/addInstructor', async (req,res)=>{
    //     const {InstrName,InstrEmail,InstrCountry,InstrPassword,Department,Biography,CourseGiven,ProfileViews,PercentOrMoneyTaken,Wallet}  = req.body
    //     const r = await instructor.create({InstrName,InstrEmail,InstrCountry,InstrPassword,Department,Biography,CourseGiven,ProfileViews,PercentOrMoneyTaken,Wallet})
    //     res.json(r)
    // });
    

    app.post('/adduser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    })

    app.get("/viewcourses", async (req,res)=> {
        console.log(req.params);
        const a= await Course.find();
        if(a==null){
         res.status(404).send('no courses available');
        }
        else{
         res.json(a); }
     
     });

     

    app.post ('/addInstructor', createInstructor);

    app.get ('/ViewMyCourses/:id',ViewMyCourses);

    app.get ('/filterCourseSubject/:id',filterCourseSubjcet);

    
    app.get ('/filterCourseCost/:id',filterCourseCost) ; 

    app.post ('/addCourse/:id',addCourse);

    app.get ('/SearchCourse/:id',SearchCourse);

    
    

    

    


    




       
