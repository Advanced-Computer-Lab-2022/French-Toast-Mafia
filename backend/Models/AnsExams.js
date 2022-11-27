const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

import Course from './Course';
import Exams from './Exams'

const ansExamSchema = new Schema ({
    AnswerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Exams',
        required: true
      }, 
      Answers: {
        type: Array,
        required: true
      }
}, { timestamps: true });

const AnsExams = mongoose.model('AnsExams', ansExamSchema);
module.exports = AnsExams;
