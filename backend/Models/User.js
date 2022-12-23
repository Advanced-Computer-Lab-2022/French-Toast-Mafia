const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const maxAge = 3 * 24 * 60 * 60;

const userSchema = new Schema({
    Name: {
      type: String,
      required: false,
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    Age: {
      type: Number,
      required: false
    },
    Gender: {
        type: String,
        required: false
    },
    Birthday: {
        type: Date,
        required: false
    },
    Country: {
      type: String,
      required: false
    },
    Password: {
      type: String,
      required: true,
      minlength: 8
    },
    PhoneNumber: {
      type: Number,
      required: false
    },
    Type : {                //individual or corperate trainee 
        type: String,
        required: false
    },
    Job: {
      type: String,
      required: false
    },
    FieldOrMajor: {
        type: String,
        required: false
    },
    University: {
        type: String,
        required: false
    },
    LearningGoal : {
        type: String,
        required: false
    },
    PreferredLevel : {
        type: String,
        required: false
    },
    UserCurrency : {
      type: String,
      required: false
  },
    Wallet: {
    type: Number,
    required: false
  },
   Courses:
  {
    type: Array,
    items: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: false
    }
  }
  }, { timestamps: true });

  userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: maxAge,
    });
    return token;
  };
  
  const User = mongoose.model("user", userSchema);
  
  const validate3 = (data) => {
    const schema = Joi.object({
      Email: Joi.string().email().required().label("Email"),
      Password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
  };
  

  // const User = mongoose.model('User', userSchema);
  module.exports = {User, validate3};
