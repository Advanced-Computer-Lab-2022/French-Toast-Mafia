const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtitleSchema = new Schema({
    Course: {
        type: mongoose.Types.ObjectId,
         ref: 'Course',
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Exercise: {
        type: Array,
        required: false
    },
    Video: {
        type: String,
        required: false
    },
    Description:{
        type: String,
        required: false

    },
    Duration: {
        type: Number,
        required: false
    },

}, { timestamps: true });
const Subtitle = mongoose.model('Subtitle', SubtitleSchema);
module.exports = Subtitle;