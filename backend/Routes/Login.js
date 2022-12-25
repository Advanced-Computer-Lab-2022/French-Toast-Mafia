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
		// const { error2 } = validateInstr(req.body);
		// const { error3 } = validateAdmin(req.body);
		if (error )
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ Email: req.body.Email });
			const intruc= await Instructor.findOne({ InstrEmail: req.body.InstrEmail });
			const admin= await Admin.findOne({ AdminEmail: req.body.AdminEmail });

		if (!{user} && !{intruc} && !{admin})
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.Password,
			User.Password || Instructor.Password || Admin.Password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = User.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
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

// const validateInstr = (data) => {
// 	const schema = Joi.object({
// 		InstrEmail: Joi.string().email().required().label("Email"),
// 		InstrPassword: Joi.string().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

// const validateAdmin = (data) => {
// 	const schema = Joi.object({
// 		AdminEmail: Joi.string().email().required().label("Email"),
// 		AdminPassword: Joi.string().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

module.exports=router;
