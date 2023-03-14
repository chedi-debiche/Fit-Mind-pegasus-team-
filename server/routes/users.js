const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
//const SECRET = '6LfG7dckAAAAAKQsntuGV7TrjHfeFUCVlRyNWbAH';

// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		let user = await User.findOne({ email: req.body.email });
// 		if (user)
// 			return res
// 				.status(409)
// 				.send({ message: "User with given email already Exist!" });

// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);

// 		user = await new User({ ...req.body, password: hashPassword }).save();

// 		const token = await new Token({
// 			userId: user._id,
// 			token: crypto.randomBytes(32).toString("hex"),
// 		}).save();
// 		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
// 		await sendEmail(user.email, "Email verification ", url);

// 		res
// 			.status(201)
// 			.send({ message: "An Email sent to your account please verify" });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });
router.get("/getById/:id", async (req, res) => {
	try {
		const data=await User.findById(req.params.id);
		res.json(data);
	
	} catch (err) {
		res.send(err)
	}
});

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		
		const message = "Thank you for registering! Please verify your email address by clicking the link below.";
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Email verification", url, message);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
	  const users = await User.find();
	  res.status(200).send(users);
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });


  //delete function

  router.delete("/:id", async (req, res) => {
	try {
	  const user = await User.findById(req.params.id);
	  if (!user)
		return res.status(404).send({ message: "User not found" });
  
	  await user.remove();
  
	  res.status(200).send({ message: "User deleted successfully" });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });


  // Block a user account
router.put("/:id/block", async (req, res) => {
	try {
	  const user = await User.findById(req.params.id);
	  user.blocked = true;
	  await user.save();
	  res.status(200).json(user);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send("Server Error");
	}
  });
  
  
  
  

module.exports = router;
