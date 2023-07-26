const mongoose = require("mongoose");
const Joi  = require('joi')
const jwt  = require('jsonwebtoken')
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken= function () {
  const token= jwt.sign({_id:this._id,isAdmin:this.isAdmin},'privateKey2')    
  return token
 }
const User=mongoose.model("User", UserSchema)

 // validation 
 function validateUser(user){
  var schema=Joi.object({
      username:Joi.string().min(3).max(44).required(),
      email:Joi.string().min(3).max(44).required().email(),
      password:Joi.string().min(3).max(44).required(),
})

return {error}=schema.validate(user)
 }
 function validateAuth(user){
  var schema=Joi.object({
   
      email:Joi.string().min(3).max(44).required().email(),
      password:Joi.string().min(3).max(44).required(),
})

return {error}=schema.validate(user)
 }

exports.User = User
exports.validateUser = validateUser
exports.validateAuth = validateAuth

