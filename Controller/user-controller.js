const user=require("../Models/User");
const course=require("../Models/Course");



function getAllUser (req,res) {
    user.find({}).then (function (user) {
    res.send(user);
    });
};

//maryam functions
const axios = require("axios");

//Requirement 6 -->Select Country
const selectCountryUser = async (req, res) => {
    
    const userID = req.params.id;
    const {Country} = req.body;
    const json='{"Country":"'+Country+'"}';
    const obj = JSON.parse(json);
    const newCountry=obj.Country;

    try{
        const u = await user.findByIdAndUpdate(userID, {Country:newCountry}, {new:true});
        res.status(200).json(u)
    }
    catch(error){
        res.status(400).json({error:error.message})
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
    const a = await course.find({}, { _id:1, NameOfCourse: 1, Duration: 1, Rating: 1,Cost:1});
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
        
        const t= req.params.Type;
        if (t !== "Corporate Trainee") {
            const courseID = req.params.id;
            try {
                const c = await course.findById(courseID, { Cost: 1, _id: 0 });
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


module.exports = {getAllUser,viewCourseTitleHoursRating,viewCoursePrice,selectCountryUser,ChangeCurrencyUser};

