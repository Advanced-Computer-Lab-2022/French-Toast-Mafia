const { Instructor } = require("../Models/Instructor");
const { User } = require("../Models/User");
const Course = require("../Models/Course")
const { Exam } = require("../Models/Exams")
const { Subtitle } = require("../Models/Subtitle")
var mongoose = require('mongoose');
const userFilterSubj = require("../Controller/instructor-controller")
const userFilterRate = require("../Controller/instructor-controller")
const courseController = require("../Controller/course-controllers")
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//creatig user 
const createUser = async (req, res) => {
    const newUser = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Age: req.body.Age,
        Gender: req.body.Gender,
        Birthday: req.body.Birthday,
        Country: req.body.Country,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        Type: req.body.Type,
        Job: req.body.Job,
        FieldOrMajor: req.body.FieldOrMajor,
        University: req.body.University,
        LearningGoal: req.body.LearningGoal,
        PreferredLevel: req.body.PreferredLevel
    })

    newUser.save()
        .then(result => res.status(200).send(result))

}

// create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (Name) => {
//     return jwt.sign({ Name }, 'supersecret', {
//         expiresIn: maxAge
//     });
// };


//user signing up 
// const signUp = async (req, res) => {
//     const { Name, Email, Password, Type, Gender } = req.body;
//     try {
//         const salt = await bcrypt.genSalt();        //hash password beha 
//         const hashedPassword = await bcrypt.hash(Password, salt);       
//         const newuser = await user.create({ Name: Name, Email: Email, Password: hashedPassword, Type: Type, Gender: Gender});
//         const token = createToken(newuser.Name);

//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json(newuser)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// //user login   
// const login = async (req, res) => {
//     const {Name, Email, Password} = req.body;

//     try {
//         const inuser = await user.findOne({ Name: req.body.Name , Email: req.body.Email });
//         console.log(inuser);
//         if (inuser) {
//           const hash = await bcrypt.compare(req.body.Password, inuser.Password);
//           if (hash) {
//             //   ..... further code to maintain authentication like jwt or sessions
//             res.send("Auth Successful");
//           } else {
//             res.send("One of the entered fields are wrong please try again.");
//           }
//         } else {
//           res.send("One of the entered fields are wrong please try again.");
//         }
//       } catch (error) {
//         console.log(error);
//         res.status(500).send(" error occured ");
//       }
// }

//user logout
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

}



//get all users 
function getAllUser(req, res) {
    User.find({}).then(function (user) {
        res.send(user);
    });

}

//filter price if you're individual trainee
const filterCostUser = async (req, res) => {
    let listCost = {};
    if (req.body.Cost && req.body.Type !== "Corporate Trainee") {
        listCost = { Cost: req.body.Cost }
    }
    const filterCostUser = await Course.find(listCost).populate('Cost');
    if (!Course) {
        res.status(404).json({ success: false })
    }
    res.send(filterCostUser);
    // db.collections.find({ price: { $gte: 50, $lte: 10000 } } ); haga ashal law nef3et 

}


const SearchCourse = async (req, res) => {
    const { NameOfCourse, Subject, Instructor } = req.body;

    try {
        if (NameOfCourse) {
            const courses = await Course.find({ 'NameOfCourse': { '$regex': NameOfCourse, '$options': 'i' } })
                .select('NameOfCourse');
            return res.status(200).json(courses);
        }
        if (Subject) {
            const courses = await Course.find({ 'Subject': { '$regex': Subject, '$options': 'i' } })
                .select('Subject');
            return res.status(200).json(courses);
        }
        if (InstrName) {
            const courses = await InstrName.find({ 'InstrName': { '$regex': InstrName, '$options': 'i' } })
                .select('InstrName');
            return res.status(200).json(courses);
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getAllUser, createUser, filterCostUser, SearchCourse };

//maryam functions
const axios = require("axios");

//Requirement 6 -->Select Country
const selectCountryUser = async (req, res) => {

    const userID = req.params.id;
    const { Country } = req.body;
    const json = '{"Country":"' + Country + '"}';
    const obj = JSON.parse(json);
    const newCountry = obj.Country;

    try {
        const u = await User.findByIdAndUpdate(userID, { Country: newCountry }, { new: true });
        res.status(200).json(u)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

    return newCountry;
};

const ChangeCurrencyUser = async (req, res) => {

    //const currency= req.params.Currency;

    const options = {
        method: 'GET',
        url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
        params: { format: 'json', from: 'EGP', to: 'USD' },
        headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

//Requirement 7 --> View Course Title, Hours, Rating
const viewCourseTitleHoursRating = async (req, res) => {
    const a = await Course.find({}, { _id: 1, NameOfCourse: 1, Duration: 1, Rating: 1, Cost: 1 });
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
    //Checking type is not handled correctly because there's no authentication, therefore, I cannot check on user type.

    const t = req.params.Type;
    if (t !== "Corporate Trainee") {
        const courseID = req.params.id;
        try {
            const c = await Course.findById(courseID, { Cost: 1, _id: 0 });
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

const viewMyInfo = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        try {
            const result = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
            const userDetails =
            {
                "Name": result.Name,
                "Email": result.Email,
                "Password": result.Password,
                "Wallet": result.Wallet
            }


            res.status(200).json(userDetails);


        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else {
        res.status(404).send('User not found');
    }

}

const ViewMyCourses = async (req, res) => {
    const userId = req.query.id;
    const resultCourses = [];
    if (userId) {
        try {
            const result = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
            const courses = result.Courses;
            for (let i = 0; i < courses.length; i++) {
                const c1 = courses[i];
                const c = await Course.findById(c1);
                const courseDetails =
                {
                    "id": c._id,
                    "Name": c.NameOfCourse
                }
                resultCourses.push(courseDetails);
            }
            res.status(200).json(resultCourses);

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else {
        res.status(404).send('User not found');
    }
}


const changePassword = async (req, res) => {
    let x = { Email: req.body.Email }
    const userPassword = await User.findOneAndUpdate(x, { Password: req.body.Password }, { new: true });
    if (userPassword) {
        res.status(200).json(userPassword)
    }
    else {
        const instrPassword = await Instructor.findOneAndUpdate(x, { InstrPassword: req.body.Password }, { new: true });
        if (instrPassword) {
            res.status(200).json(instrPassword)
        }
        else {
            res.status(404).send('User not found');
        }
    }

}

const sendPassChangeMail = async (req, res) => {

    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: false,
            auth: {
                user: "frenchtoastmafia404@gmail.com",
                pass: "rovgchcnlyjqkpxm"

            },
            tls: {
                rejectUnauthorized: false
            }
        });

        //send email to the user with link to change password
        const { Email } = req.body.Email;
        let x = { Email: req.body.Email }

        transporter.sendMail({
            from: 'frenchtoastmafia404@gmail.com',
            to: x.Email.toString(),
            subject: 'Password Change Request',
            text: 'Click on the link to change your password',
            html: '<a href="http://localhost:3000/#/changePassword">Click here to change your password</a>'
        });

    });

}


const addCourse = async (req, res) => {
    const userId = req.query.id;
    const courseId = req.body;

    const resultUser = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    const resultCourse = await Course.findOne({ _id: mongoose.Types.ObjectId(courseId) });

    if (resultUser) {
        if (resultCourse) {
            try {

                await User.findByIdAndUpdate(userId, { $push: { Courses: resultCourse._id } });
                res.status(200).json(resultCourse);

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        }
        else {
            res.status(404).send('Course not found');
        }
    } else {
        res.status(400).json({ error: "Please enter a valid userId" });
    }

}

const removeCourse = async (req, res) => {
    const userId = req.query.id;
    const courseId = req.body;

    const resultUser = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    const resultCourse = mongoose.Types.ObjectId(courseId);

    if (resultUser) {
        if (resultCourse) {
            try {

                await User.findByIdAndUpdate(userId, { $pull: { Courses: resultCourse._id } });
                res.status(200).json(resultCourse);

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        }
        else {
            res.status(404).send('Course not found');
        }
    } else {
        res.status(400).json({ error: "Please enter a valid userId" });
    }
}

//watch video and update progress attribute in user schema
const videoProgress = async (req, res) => {
    const userId = req.query.id;
    const courseId = req.query.courseId;
    const subtitleId = req.query.subtitleId;

    const resultUser = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    const userCourses = resultUser.Courses;
    const userSubtitles = resultUser.Subtitles;
    let uCourse = null;

    let courseFound = false;
    let subtitleFound = false;

    if (resultUser) {
        for (let i = 0; i < userCourses.length; i++) {
            if (userCourses[i] == courseId) {
                courseFound = true;
            }
        }
        for (let i = 0; i < userSubtitles.length; i++) {
            if (userSubtitles[i].subtitle == subtitleId) {
                subtitleFound = true;
            }
        }
        if (courseFound) {
            if (!(subtitleFound)) {
                try {
                    await User.findByIdAndUpdate
                        (userId, { $push: { Subtitles: { course: courseId, subtitle: subtitleId } } });
                    //update progress attribute in user schema
                    uCourse = await Course.findOne({ _id: mongoose.Types.ObjectId(courseId) });
                    const totalExams = uCourse.ExamCourse.length;
                    const totalSubtitles = uCourse.CourseSubtitle.length;
                    const p = 1 / (totalExams + totalSubtitles);
                    //get the progress of the user
                    for (let i = 0; i < resultUser.Progress.length; i++) {
                        if (resultUser.Progress[i].courseId == courseId) {
                            const progress = resultUser.Progress[i].Progress;
                            const newProgress = progress + p;
                            console.log(newProgress);
                            //update the progress of the user of a specific course
                            await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId), "Progress.courseId": mongoose.Types.ObjectId(courseId) },
                                { $set: { "Progress.$.Progress": newProgress } });

                        }
                    }
                    res.status(200).json("Subtitle added to user");
                } catch (error) {
                    res.status(400).json({ error: error.message })
                }
            }
            else {
                res.status(400).json({ error: "Subtitle already exists" });
            }
        }
        else {
            res.status(400).json({ error: "Course not found" });
        }
    }
    else {
        res.status(400).json({ error: "Please enter a valid userId" });
    }
}

//get user progress in a specific course
const getUserProgress = async (req, res) => {
    const userId = req.query.id;
    const courseId = req.query.courseId;

    const result = await User.findOne({ _id: mongoose.Types.ObjectId(userId), "Progress.courseId": mongoose.Types.ObjectId(courseId) });
    if (result) {
        const prog = result.Progress[0].Progress * 100;
        const progress = Math.ceil(prog);
        res.status(200).json(progress);
    }
    else {
        res.status(400).json({ error: "Please enter a valid userId" });
    }
}


const userRefund = async (req, res) => {
    const userId = req.body.id;
    const courseId = req.body.courseId;

        const refundedCourses=[];
        let courseFound=false;
        console.log(userId);
        if (userId){
            // const resultUser =await User.find({_id:mongoose.Types.ObjectId(userId)});
            const resultUser= await User.findById(userId);
            console.log(resultUser)
            const userCourses=resultUser.Courses;
            for (let i=0;i<userCourses.length;i++) {
                if (userCourses[i]==courseId){
                    courseFound=true;
                }
            }
            console.log("zzzzzzzzzzzz");

            if (courseFound){
                console.log("teettttttt");
                const result=await User.findById({_id:mongoose.Types.ObjectId(userId)}, {"Progress.courseId":mongoose.Types.ObjectId(courseId)});
                // console.log(result);
                if (result){
                    console.log(result);
                    console.log("beebebebebebbbebebeb");
                    const prog=result.Progress[0]
                    // [1].Progress*100;
                    console.log("blllllll");

                    const progress=Math.ceil(prog);
                    res.status(200).json(progress);
                } else {
                        res.status(400).json({message:"Please enter a valid userId"});
                    }
               if (result.Progress<=50){
                refundedCourses.push(courseId);
                    res.status(200).json( {message :"You have successfully refunded this course"})
                    } else {
                    res.status(400).json({message:"You can't refund this course because you attended more than 50% of the course"});
                    }
               }     
        }
    }

     


//decrement user progress in a specific course
const userProgressDecrement = async (req, res) => {
    const userId = req.query.id;
    const courseId = req.query.courseId;

    const result = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    const userCourses = result.Courses;
    let courseFound = false;

    //course exists
    for (let i = 0; i < userCourses.length; i++) {
        if (userCourses[i] == courseId) {
            courseFound = true;
        }
    }

    //get progress of user's course
    if (courseFound) {
        const r = await Course.findOne({ _id: mongoose.Types.ObjectId(courseId) });
        for (let i = 0; i < result.Progress.length; i++) {
            if (result.Progress[i].courseId == courseId) {
                const progress = result.Progress[i].Progress;
                if (progress > 0) {
                    const newProgress = progress - (1 / (r.ExamCourse.length + r.CourseSubtitle.length));
                    try {
                        //update progress attribute in user schema
                        await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId), "Progress.courseId": mongoose.Types.ObjectId(courseId) },
                            { $set: { "Progress.$.Progress": newProgress } });
                        res.status(200).json("Progress decremented");
                    } catch (error) {
                        res.status(400).json({ error: error.message })
                    }
                }
                else {
                    res.status(400).json({ error: "Progress already 0" });
                }
            }
            else {
                res.status(400).json({ error: "Course not found" });
            }
        }
    }
    else {
        res.status(400).json({ error: "Please enter a valid userId" });
    }

}

//send mail with certificate to user
const sendCertificate = async (req, res) => {
    const userId = req.query.id;
    const result = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    const userEmail = result.Email;
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: false,
            auth: {
                user: "frenchtoastmafia404@gmail.com",
                pass: "rovgchcnlyjqkpxm"

            },
            tls: {
                rejectUnauthorized: false
            }
        });

        //send email to the user with link to change password

        transporter.sendMail({
            from: 'frenchtoastmafia404@gmail.com',
            to: userEmail,
            subject: 'Certificate of completion',
            text: 'Congratulations! You have completed the course. Please find the certificate attached.',
            attachments: [
                {
                    filename: 'certificate.pdf',
                    path: 'd:/GUC/Semester 7/ACL/Sprint 3/French-Toast-Mafia/frontend/main/public/Certificate.pdf',
                    contentType: 'application/pdf'
                }
            ]
        }, (err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        }
        );


    });
}

//get user grades of a certian exam
const getUserGrades = async (req, res) => {
    const userId = req.query.id;
    const examId = req.query.examId;
    const result
        = await User.findById(mongoose.Types.ObjectId(userId), { Exams: { $elemMatch: { exam: mongoose.Types.ObjectId(examId) } } });
    if (result) {
        if (result.Exams.length == 0) {
            res.status(200).json(0);
        }
        else {
        const grades = result.Exams[0].grade;
        res.status(200).json(grades);
        }
    }
    else {
        res.status(200).json(0);
    }
}
      




module.exports = {
    getAllUser,
    viewCourseTitleHoursRating, viewCoursePrice,
    selectCountryUser, ChangeCurrencyUser, addCourse,
    viewMyInfo, ViewMyCourses, changePassword, sendPassChangeMail,
    removeCourse, logout, videoProgress, userRefund, getUserProgress,
     userProgressDecrement, sendCertificate, getUserGrades
}
module.exports = {getAllUser,
    viewCourseTitleHoursRating,viewCoursePrice,
    selectCountryUser,ChangeCurrencyUser,addCourse,
    viewMyInfo,ViewMyCourses,changePassword,sendPassChangeMail,
    removeCourse, logout, videoProgress,userRefund, getUserProgress}



    //find user using id
        //  if (userId) {
        //     const result = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
        //         console.log("tamtamtammmmm");
        //         const userCourse = userfound.Courses;
        //         let courseFound = false;
        //         // course exists 
        //         for (let i = 0; i < userCourse.length; i++) {
        //             if (userCourse[i] == courseId) {
        //                 courseFound = true;
        //             }
        //         }
    
        // if (courseFound) {
        //     //user progress in the course
        //     const refundedCourses=[];
        //     const result=await User.findOne({_id:mongoose.Types.ObjectId(userId),"Progress.courseId":mongoose.Types.ObjectId(courseId)});
        //         if (result){
        //             const prog=result.Progress[0].Progress*100;
        //             const progress=Math.ceil(prog);
        //             res.status(200).json(progress);
        //         } else {
        //                 res.status(400).json({error:"Please enter a valid userId"});
        //             }
        //         //adding course to refunded courses id progress 50% or less 
        //             if (progress <=  0.5){ 
        //                 refundedCourses.push(courseId);
        //                 res.status(200).json( {message :"You have successfully refunded this course"})
        //             } else {
        //             res.status(400).json({error:"You can't refund this course because you attended more than 50% of the course"});
        //             }
        //         }
        // // const resultUser = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
        // const userCourses = resultUser.Courses;
        // let courseFound = false;

        // //course exists 
        // for (let i = 0; i < userCourses.length; i++) {
        //     if (userCourses[i] == courseId) {
        //         courseFound = true;
        //     }
        // }

        // //get progress of user's course 
        // if (courseFound) {
        //     for (let i = 0; i < resultUser.Progress.length; i++) {
        //         if (resultUser.Progress[i].courseId == courseId) {
        //             const progress = resultUser.Progress[i].Progress;
        //             if (progress==0.5){
        //                 const refund=0;
        //                 try {
        //                     //find price of this course 
        //                     const course = await Course.findOne({ _id: mongoose.Types.ObjectId(courseId) }); 
        //                     const price = course.Price;
        //                     //update user's balance
        //                     const newBalance = resultUser.Wallet + price;
        //                     resultUser= await User.findByIdAndDelete(courseId);
        //                     console.log(newBalance);
        //                     }catch {
        //                         res.status(400).json({ error: error.message })
        //                     }
        //             }
        
        //         } else {
        //             res.status(400).json({ error: "Course not found" });
        //              } 
    //     }
