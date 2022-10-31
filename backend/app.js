const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='mongodb+srv://admin:Mayar2611@db.ntawmzm.mongodb.net/?retryWrites=true&w=majority';
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
const {getAllCourse , viewCourse}= require ("./Controller/course-controllers");

//maryam functions importing from user-controller.js
//const selectCountry= require ("./Controller/user-controller");
//const selectCount=require("./views/SelectCountry");
const {getAllUser,viewCourseTitleHoursRating,viewCoursePrice,selectCountryUser,ChangeCurrency}= require ("./Controller/user-controller");
const {getAllInstructors,selectCountryInstructor,addCourse , createInstructor , filterCourseSubjcet , filterCourseCost , ViewMyCourses , SearchCourse}= require ("./Controller/instructor-controller");


mongoose.connect(MongoURI)
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


    // app.get('/adminlist', getAllAdmin);
    app.get('/courselist', getAllCourse);
    app.get('/instructorList', getAllInstructors);
    app.get('/userlist', getAllUser);

     /////////////////////////////////////////////////////////////////////////////////
     
     //nouran functions

     //Instructor
     app.post('/addCourse/:id', addCourse);

     //Course
     app.get('/viewCourse/:id',viewCourse)

    //////////////////////////////////////////////////////////////////////////////////

    // app.post ('/addInstructor', createInstructor);

    app.get ('/ViewMyCourses/:id',ViewMyCourses);

    app.get ('/filterCourseSubject/:id',filterCourseSubjcet);

    
    app.get ('/filterCourseCost/:id',filterCourseCost) ; 

    app.post ('/addCourse/:id',addCourse);

    app.get ('/SearchCourse/:id',SearchCourse);

    app.use(express.json())
    app.post('/adduser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    });

    // app.get('/adminlist', getAllAdmin);


    app.get("/viewcourses", async (req,res)=> {
        console.log(req.params);
        const a= await Course.find();
        if(a==null){
         res.status(404).send('no courses available');
        }
        else{
         res.json(a); }
     
     });