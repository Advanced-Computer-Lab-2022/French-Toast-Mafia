const express= require("express");

const router = express.Router();

const { User, validate3 } = require("../Models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate3(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		const user = await User.findOne({ Email: req.body.Email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		// const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.body.Password, salt);

		const newUser= await new User({ ...req.body, Password: hashPassword }).save();

        // const token = createToken(newUser.Email);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json(newUser);
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
	}
});

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

module.exports=router;
