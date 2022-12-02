const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
      type: String,
      required: true,
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
        required: true
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
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
