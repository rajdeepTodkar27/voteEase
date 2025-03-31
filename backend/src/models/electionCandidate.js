import mongoose from "mongoose";
const { Schema } = mongoose;

const eCandidateSchema = new Schema({
  electionName: {type: String, required: [true, "election name is not given"]},
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } ]
})

const ECandidate = mongoose.model("ECandidate", eCandidateSchema)

export default ECandidate