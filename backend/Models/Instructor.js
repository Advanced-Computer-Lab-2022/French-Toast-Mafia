const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const maxAge = 3 * 24 * 60 * 60;


const instructorSchema = new Schema({
    InstrName: {
      type: String,
      required: true
    },
    InstrEmail: {
      type: String,
      required: true,
      unique: true
    },
    InstrCountry: {
      type: String,
      required: false
    },
    InstrPassword: {
      type: String,
      required: true,
      minlength: 8
    },
    Department: {
      type: String,
      required: false
    },
    Biography: {
      type: String,
      required: false
    },
    CourseGiven: {
      type: Array,
      required: false
    },
    ProfileViews: {
      type: Number,
      required: false
    },
    PercentOrMoneyTaken: {
      type: Number,
      required: false
    },
    Wallet: {
      type: Number,
      required: false
    },
    Currency: {
      type: String,
      required: false
    },
    InstrReview: {
      type: String,
      required: false
    },
    InstrRating: {
      type: Array,
      required: false
    },
    Exam: {
      type: Array,
      required: false
    },

    Reports: {
      type: Array,
      required: false
    }

    
  }, { timestamps: true });
  
  instructorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: maxAge,
    });
    return token;
  };
  
  const Instructor = mongoose.model('Instructor', instructorSchema);
  
  const validate2 = (data) => {
    const schema = Joi.object({
      InstrEmail: Joi.string().required().label("Email"),
      InstrPassword: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
  };

  module.exports = {Instructor, validate2};