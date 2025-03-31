import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {type: String, required: true, unique:[true, "name already exists"]}, 
  email: {type: String, required: true, unique:[true, "email already exists"]},    
  password: {type: String, required: true, minlength:[8, "minimum 8 characters required"]},  
  role: {type: String, enum:["user", "admin"], default: "user"}, 
})

const User = mongoose.model("User", userSchema)

export default User