const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 10,
  },
  lastName: {
    type: String,
    maxLength: 10,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email.."+ value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    maxLength: 10,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("your password is invalid.")
      }
    }
  },
  phoneNumber: {
    type: String,
    maxLength: 12,
    required: true,
  },
  Gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
}, {timestamps:true});

// 1st thing i pass model and then send schema
const User = mongoose.model("User", userSchema);
module.exports = User;
