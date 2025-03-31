import mongoose from "mongoose";
const { Schema } = mongoose;

const voteSchema = new Schema({
  candidateName: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  eName: {type: String, required: true},
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }]
})

const Vote = mongoose.model("Vote", voteSchema)

export default Vote