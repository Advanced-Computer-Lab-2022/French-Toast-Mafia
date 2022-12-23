require("dotenv").config();
const express= require("express");
const mongoose= require ("mongoose");
const MongoURI='mongodb+srv://admin:Mayar2611@db.ntawmzm.mongodb.net/?retryWrites=true&w=majority';
const cors=require('cors');
const cookieParser = require('cookie-parser');

const app= express();
const port= process.env.PORT || "5000" ;
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next ()
})

const admin= require('./Models/Admin');


//require the routes
const userRoute = require('./Routes/User-route');
const adminRoute = require('./Routes/Admin-route');
const instructorRoute = require('./Routes/Instructor-route');
const courseRoute = require('./Routes/Course-route');
const examRoute = require ('./Routes/Exams-route');
const subtitleRoute = require ('./Routes/Subtitle-route');
const reportRoute = require('./Routes/Report-route');
const cardRoute = require ('./Routes/Card-route');
const signupRoute = require ('./Routes/Signup');
const loginRoute = require ('./Routes/Login');


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



    app.use('/Admin',adminRoute);

    app.use('/Course',courseRoute);

    app.use('/Instructor',instructorRoute);

    app.use('/User',userRoute);

    app.use('/Subtitle',subtitleRoute);
    
    app.use('/Exams',examRoute);
        
    app.use('/Report',reportRoute);

    app.use('/Card',cardRoute);

    app.use('/signup', signupRoute);

    app.use('/login', loginRoute);




    app.use(express.json())


    app.post('/addUser', async (req,res)=>{
        const {AdminName,AdminId,AdminCountry}  = req.body
        const r = await admin.create({AdminName,AdminId,AdminCountry})
        res.json(r)
    });
