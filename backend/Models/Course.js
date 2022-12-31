const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const {ObjectId} = mongoose.Schema;

const courseSchema = new Schema({
    NameOfCourse: {
      type: String,
      required: true
    },
    CourseSubtitle: {
      type: Array,
      required: false
    },
    Instructor: {
      type: Array,
      //type: mongoose.Types.ObjectId,
     // ref: 'Instructor',
      required: true
    },
    Duration: {
      type: Number,
      required: false
    },
    LevelOfCourse: {
      type: String,
      required: true
    },
    Summary: {
      type: String,
      required: true
    },
    Subject: {
      type: String,
      required: true
    },
    Rating: {
      type: Array,
      required: false
    },
    avgRating: {
      type: Number,
      required: false,
      default: 0
    },
    NoOfViews: {
      type: Number,
      required: false
    },
    Promotion: {           //percent el 3adeya 
      type: Number,
      required: false
    },
    StartDatePromotion: {   // we'll use the predifined current time instead
      type: Date,
      required: false
    }, 
    EndDatePromotion: {     //expiration date 
      type: Date,
      required: false
    }, 
    ExamCourse: {
      type: Array,
      required: false
    },
    Cost: {
        type: Number,
        required: true
      },
    CourseCurrency: {
        type: String,
        required: false
    },
    Preview: {
      type: String,
      required: false
    },

    Published: {
      type : Boolean,
      default: false
    }
    
    
  }, { timestamps: true });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;