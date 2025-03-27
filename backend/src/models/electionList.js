import mongoose from "mongoose";
const { Schema } = mongoose;

const ElistSchema = new Schema({
  electionname: {type : String, required: [true,"required title of the election"]},
  lastdateofReg: {type: Date, required: [true,"last date of the registration is not given"]},
  isRegistration : {type: Boolean, default: true},
  isVoting: {type: Boolean, default: false}
})

const Electionlist = mongoose.model("Electionlist", ElistSchema)

export default Electionlist