const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;


const examSchema = new Schema ({
    ExamId: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
      }, 
      Questions: {
        type: Array,
        required: true
      }, 
      Choices: {
        type: String,
        required: true 
      }
}, { timestamps: true });

const Exams = mongoose.model('Exams', examSchema);
module.exports = Exams;