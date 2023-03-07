const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
require('dotenv').config();
const secretKey = 'my-secret-key';




const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
	// adress : {type : String, required : true},
	phone : {type : String , required : true},
	profile: { type: String }

});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, secretKey, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({

	
		// profile: Joi.string()
		// .empty()
		// .required()
		// .messages({
		//   'any.required': 'votre image est requis',
		//   'string.empty': 'votre image ne doit pas être vide',
		// }),
	
	  firstName: Joi.string()
		.empty()
		.required()
		.messages({
		  'any.required': 'Le prénom est requis',
		  'string.empty': 'Le prénom ne doit pas être vide',
		}),
	  lastName: Joi.string().required().messages({
		'any.required': 'Le nom est requis',
	  }),
	  email: Joi.string()
		.email()
		.required()
		.messages({
		  'any.required': 'L\'adresse email est requise',
		  'string.email': 'Veuillez entrer une adresse email valide',
		}),
	  password: passwordComplexity().required().messages({
		'any.required': 'Le mot de passe est requis',
		'passwordComplexity.tooShort': 'Le mot de passe doit avoir au moins 6 caractères',
		'passwordComplexity.tooWeak': 'Le mot de passe doit être plus complexe',
	  }),
	//   address: Joi.string().required().messages({
	// 	'any.required': 'L\'adresse est requise',
	//   }),
	  phone: Joi.string()
		.trim()
		.required()
		.pattern(/^\d{8}$/)
		.messages({
		  'any.required': 'Le numéro de téléphone est requis',
		  'string.pattern.base': 'Le numéro de téléphone doit être composé de 8 chiffres',
		}),
	});
  
	return schema.validate(data, { abortEarly: false });
  };
  
module.exports = { User, validate };
