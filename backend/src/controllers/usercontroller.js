import Profile from "../models/profile.js";
import User from "../models/userSchema.js";
import ECandidate from "../models/electionCandidate.js";
import Vote from "../models/voteSchema.js"
const profilesave = async (req, res) => {
  const user = await Profile.findOne({ user: req.user.id })
  console.log(req.body)
  if (!user) {
    try {
      const userid = req.user.id
      const { fullname, phoneno, dob } = req.body
      const newprofile = new Profile(
        {
          user: userid,
          fullname: fullname,
          phoneno: phoneno,
          dob: dob
        }
      )
      await newprofile.save()
      res.status(201).json({ success: true, message: "profile saved successfully" })
    } catch (err) {
      res.status(501).json({ success: false, message: `somthing went wrong Error: ${err}` })
    }
  } else {
    const updatedData = {
      fullname: req.body.fullname,
      phoneno: req.body.phoneno,
      dob: new Date(req.body.dob)
    }
    console.log(updatedData)
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updatedData },
      { new: true, runValidators: true }
    )
      .then(updatedProfile => {
        if (!updatedProfile) {
          return res.status(404).json({success:false, message: "Profile not found" });
        }
        res.json({success:true, message: "Profile updated successfully", updatedProfile });
      })
      .catch(err => res.status(500).json({success:false, error: err.message }));
  }
}

const getprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const isProfile = await Profile.findOne({ user: req.user.id })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log(isProfile)
    if (!isProfile) {
      return res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
      });
    }
    console.log("hello")
    res.status(200).json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      fullname: isProfile.fullname,
      phoneno: isProfile.phoneno,
      dob: new Date(isProfile.dob)
    })


  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const registerElection = async (req, res) => {
  try {
    const candidate = req.user.id;
    const eName = "Class Representative"
    const electionuser = await User.findById(candidate)
    const isregister= await ECandidate.findOne({candidateName:candidate})
    if(isregister){
      return res.status(401).json({success:false, message:"already register for this election"})
    }
    if (!electionuser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const newcandidate = new ECandidate({
      electionName: eName,
      candidateName: candidate
    })
    await newcandidate.save()
    res.status(201).json({ success: true, message: "candidate register successfully" })
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to register for the election" })
  }
}

const getEcandidateDetails = async (req, res) => {
  try {
    const ename = "Class Representative"
    const getlist = await ECandidate.find({ electionName: ename }).populate("candidateName","_id userName")
    res.status(201).json({ success: true, message: "candidate details get successfully",candidate:getlist }, )
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to get details" })
  }
}

const giveVote = async (req, res) => {
  const UcheckVote = await User.findById(req.user.id)
  if (UcheckVote.isVoted) {
    return res.status(401).json({ success: false, message: "Not authorized to vote already voted in the election" })
  }
  try {
    const candidateN = req.body.ECandidate
    const voter = req.user.id
    const eName = "Class Representative"
    const newVote = new Vote({
      candidateName: candidateN,
      eName: eName,
      voterId: voter
    })
    await newVote.save()
    User.findOneAndUpdate({ _id: voter }, { $set: { isVoted: true } }).then(updatedProfile => {
      if (!updatedProfile) {
        return res.status(404).json({success:false, message: "Profile not found" });
      }
      res.json({success:true, message: "Voted successfully"});
    })
      .catch(err => res.status(500).json({success:false, error: err.message }));
  } catch (err) {
    res.status(500).json({ success: false, message: `failed to give vote` })
  }
}

const getResult = async (req, res) => {
  try {
    const ename = "Class Representative";

    const EcandidateList = await ECandidate.find({ electionName: ename })
      .populate("candidateName", "_id userName");

    const finalresult = {};

    await Promise.all(
      EcandidateList.map(async (element) => {
        const cVotelist = await Vote.find({ candidateName: element.candidateName._id });
        finalresult[element.candidateName.userName] = cVotelist.length;
      })
    );

    res.status(200).json({
      success: true,
      message: "Successfully retrieved election result data",
      resultdata: finalresult
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get election result" });
  }
};

export { profilesave, getprofile, registerElection, getEcandidateDetails, giveVote, getResult }