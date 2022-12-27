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

		var user = await User.findOne({ Email: req.body.Email });

		if (!user){
			user= await Instructor.findOne({ InstrEmail: req.body.InstrEmail });
		}

		if (!user){
			user= await Admin.findOne({ AdminName: req.body.AdminName });
		}

		// console.log(user);
		// console.log(req.body.Password);
        // console.log(user.Password);

		const validPassword = await bcrypt.compare(
			req.body.Password,
			user.Password
		);
		if (!validPassword) 
			return res.status(401).send({ message: "Invalid Email or Password" });
	
		const token = user.generateAuthToken();
		 return res.status(200).send({ data: token, message: "logged in successfully",userid:user._id });
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