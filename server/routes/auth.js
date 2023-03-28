const router = require("express").Router();
const { User } = require("../models/user");
//const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const secretKey = 'my-secret-key';
const session= require('express-session')


router.use(session({
    secret:'my-secret-key',
    resave:false,
    saveUninitialized:false,
}));

router.post("/", async (req, res) => {
	try {
		
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });

		if (!user.verified) {
			// let token = await Token.findOne({ userId: user._id });
			// if (!token) {
			// 	token = await new Token({
			// 		userId: user._id,
			// 		token: crypto.randomBytes(32).toString("hex"),
			// 	}).save();
			// 	const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
			// 	await sendEmail(user.email, "Verify Email", url);
			// }

			// return res
			// 	.status(400)
			// 	.send({ message: "An Email sent to your account please verify" });
			return res.status(401).send({ message: "User not verified yet" });

		}

		// const token = user.generateAuthToken();
		// res.status(200).send({ data: token, message: "logged in successfully" });
		//req.session.user=user;

		if (!user.block) {
		req.session.user = user.email;

		const token=await jwt.sign({sub:user._id},secretKey,{expiresIn:'7d'});
		return res.cookie({"token":token}).send({token:token,message:'loggedIn successfully',userId:user._id})
		}
		if (user.block)
		{
			return res.status(401).send({message : "this account is blocked please contact our client service"})
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post('/logout',function(req,res){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
			res.status(500).send('Error logging out')
		}else{
			res.send("logged out successfully");
		}
	});
});

router.get('/protected',IsLoggedIn,function(req,res){
	
			res.send("authorized to access");
		});

function IsLoggedIn(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.status(401).send('not authorized');
	}
}
	



const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
