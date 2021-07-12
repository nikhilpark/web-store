const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String, 
  password: String,
  email:String,
  firstname: String,
  lastname: String,
  address1:String,
  address2:String,
  contactno:Number,
  city:String,
  state:String,
  zip:Number,
  userRole:{
    type:Number,
    default:3
  }
 
});

module.exports = mongoose.model("User", userSchema);
