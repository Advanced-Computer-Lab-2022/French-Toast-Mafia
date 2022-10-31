const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='';
const cors = require('cors');

const app= express();
app.use(express.json()) 
app.use(cors());


const port= process.env.PORT || "5000" ;
const user= require('./Models/User');
const admin= require('./Models/Admin');
const Instructor= require('./Models/Instructor');
const course= require('./Models/Course');

const getAllUser= require ("./Controller/user-controller");
const {getAllAdmin, createAdmin, createInstructor, createCorporateTrainess}= require ("./Controller/admin-controller");
const getAllInstructor= require("./Controller/instructor-controller");
const getAllCourse= require ("./Controller/course-controllers");



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
    app.get('/instructorlist', getAllInstructor);
    app.get('/userlist', getAllUser);
    app.get('/adminlist', getAllAdmin);
    app.post('/createAdmin',createAdmin);
    app.post('/createInstructor',createInstructor);
    app.post('/createCorporatetrainess',createCorporateTrainess);

    app.use(express.json()) 
    app.post('/adduser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    })

    


       
