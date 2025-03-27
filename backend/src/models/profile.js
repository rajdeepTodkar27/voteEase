import mongoose from "mongoose";
const { Schema } = mongoose;

const profileschema = new Schema({
  // userId: String, i.e voter id is _id
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  fullname: {type: String, max:[20, "string limit exceeded"]},
  phoneno: { type: Number, minlength: 10, maxlength: 10 },  
  dob: Date,
})

const Profile = mongoose.model("Profile", profileschema)

export default Profile