import mongoose from "mongoose";
const { Schema } = mongoose;

const ElistSchema = new Schema({
  electionname: { type: String, unique: true, lowercase: true, required: [true, "required title of the election"] },
  isRegistration: { type: Boolean, default: true },
  isVoting: { type: Boolean, default: false },
  isResult: { type: Boolean, default: false },
})

const Electionlist = mongoose.model("Electionlist", ElistSchema)

export default Electionlist