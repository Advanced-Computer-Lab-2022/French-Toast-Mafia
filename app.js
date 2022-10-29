const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='';
require ('dotenv').config()

const app= express();
const port= process.env.PORT || "5000" ;
const user= require('./Models/User');
const admin= require('./Models/Admin');
const Instructor= require('./Models/Instructor');
const course= require('./Models/Course');
const {getAllUser,createUser,filterCostUser,SearchCourse}= require ("./Controller/user-controller");
const getAllAdmin= require ("./Controller/admin-controller");
const {getInstructor, createInstructor, filterSubject, filterRating, filterCost} = require("./Controller/instructor-controller");
const {getAllCourse, createCourse} = require ("./Controller/course-controllers");

app.use(express.json())   
mongoose.connect(process.env.Mongo_URI
        )
        .then (()=> {
            console.log("mongoDB is now connected")
            app.listen(5000, () => {
                console.log('listening to requests on http://localhost:5000')
            })
        })
        .catch((err) => console.log(err));


    app.get('/adminlist', getAllAdmin);
    app.get('/courselist', getAllCourse);
    app.get('/instructorlist', getInstructor);
    app.get('/userlist', getAllUser);

    app.get('/userlist/:Type', getAllUser);
    app.get('/userlist/:id', getAllUser);


    app.get("/filterSub/:Subject",filterSubject);
    app.get("/filterRating/:Rating",filterRating);
    app.get("/filterCost/:Cost",filterCost);
    app.get("/filterCostUser/:Cost", filterCostUser);
    app.get("/searchCourseUser/:key",SearchCourse);




   app.post("/addInstructor",createInstructor);
   app.post("/addUser",createUser);
   app.post("/addCourse",createCourse);



    // app.post('/addinstructor', async (req,res)=>{
    //     const {InstrName,InstrEmail, InstrCountry, InstrPassword, Department, Biography, CourseGiven, ProfileViews, PercentOrMoneyTaken, Wallet}  = req.body
    //     const rr = await admin.create({InstrName,InstrEmail, InstrCountry, InstrPassword, Department, Biography, CourseGiven, ProfileViews, PercentOrMoneyTaken, Wallet})
    //     res.json(rr)
    // })
    // app.post('/adduser', async (req,res)=>{
    //     const {AdminName,AdminId,AdminCountry}  = req.body
    //     const r = await admin.create({AdminName,AdminId,AdminCountry})
    //     res.json(r)
    // })




       
