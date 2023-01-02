const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const maxAge = 3 * 24 * 60 * 60;

const AdminSchema = new Schema({
    AdminName: {
        type: String,
        required: false
    },
    AdminId: {
        type: String,
        required: true,
        unique: true

    },
    Requests: {
      type: Array,
      required: false
    },
    reqRefunds: {
      type: Array,
      required: false
    }

}, { timestamps: true });

AdminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'supersecret', {
      expiresIn: maxAge,
    });
    return token;
  };
  
  const Admin = mongoose.model('Admin', AdminSchema);
  
  const validate1 = (data) => {
    const schema = Joi.object({
        AdminName: Joi.string().required().label("Name"),
        AdminId: Joi.number().required().label("ID Number"),
    });
    return schema.validate(data);
  };



module.exports = {Admin, validate1 };