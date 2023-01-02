const express= require("express");

const router = express.Router();
const { User, validate3} = require("../Models/User");
const {Instructor, validate2} = require("../Models/Instructor");
const {Admin, validate1} = require("../Models/Admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error ) 
			return res.status(400).send({ message: error.details[0].message });
		    console.log(req.body.Email);
            let validPassword;

		    var user = await User.find({ Email: req.body.Email });
			if(user.length!=0){
			console.log(user);
		     validPassword = await bcrypt.compare(req.body.Password, user[0].Password);
			}
		if (user.length==0) {
		user= await Instructor.find({ InstrEmail: req.body.Email });
		validPassword = await bcrypt.compare(req.body.Password,user[0].InstrPassword);
		}
		console.log(validPassword);
		if (!validPassword) 
			return res.status(401).send({ message: "Invalid Email or Password" });
	
		const token = user[0].generateAuthToken();
		console.log(user[0]._id);
		 return res.status(200).send({ data: token, message: "logged in successfully",id:user[0]._id });
		 
	} catch (error) {

		res.status(500).send({ message: "Internal Server Error" });
		console.log(error);
	}
});


const validate = (data) => {
	const schema = Joi.object({
		Email: Joi.string().email().required().label("Email"),
		Password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports=router;