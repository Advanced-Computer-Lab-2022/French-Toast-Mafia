const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    NameOfCourse: {
      type: String,
      required: true
    },

    //This references the instructor id that made the course (to make sure that the instructor actually exists)
    //It will be useful if we need to filter courses by instructor
    //El 7etta di Hatfdal commented l8ayet ma n3mel add instructors lel database fe3leyan
    /*
    InstructorId: {
      type: mongoose.Types.ObjectId,
      ref:'Instructor',
      required: true
    },
    */
    InstructorId: {
      type: String,
      required: true
    },
    CourseSubtitle: {
      type: String,
      required: true
    },

    //Removed CourseID since it gets automatically added by mongoDB
    
    Summary: {
      type: String,
      required: true
    },
    Subject: {
      type: String,
      required: true
    },
    LevelOfCourse: {
      type: String,
      required: true
    },
    Cost: {
      type: String,
      required: true
    },

    //Commenting the 'required' parameter since these arent required to be added by the instructor when first creating the course
    Duration: {
      type: String,
      // required: true
    },
    
   
    Rating: {
      type: String,
      // required: true
    },
    NoOfViews: {
      type: Number,
      // required: true
    },
    Discount: {
      type: Number,
      // required: false
    }
  }, { timestamps: true });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;