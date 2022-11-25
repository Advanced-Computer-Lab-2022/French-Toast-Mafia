const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    AdminName: {
        type: String,
        required: true
    },
    AdminId: {
        type: String,
        required: true,
        unique: true

    }

}, { timestamps: true });
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;