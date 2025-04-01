import Profile from "../models/profile.js";
import User from "../models/userSchema.js";
import ECandidate from "../models/electionCandidate.js";
import Vote from "../models/voteSchema.js"
import Electionlist from "../models/electionList.js";
import mongoose from "mongoose";


const profilesave = async (req, res) => {
  const user = await Profile.findOne({ user: req.user.id })

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
   
    if (!isProfile) {
      return res.status(201).json({success:true,
        message: "successfully got the data",            
        data: {id: user._id,
        userName: user.userName,
        email: user.email}
      }); 
    }
  
    res.status(201).json({success:true,
      message: "successfully got the data",      
      data:{id: user._id,
      userName: user.userName,
      email: user.email,
      fullname: isProfile.fullname,
      phoneno: isProfile.phoneno,
      dob: new Date(isProfile.dob).toISOString().split("T")[0]}
    })


  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const electionList=async(req,res)=>{
  try{
    const elist= await Electionlist.find({isRegistration:true})
    if(elist.length===0){
      return res.status(404).json({success:false, message:"election registration is inactive"})
    }
    const finallist=[]
    elist.forEach(element => {
      finallist.push(element.electionname)
    });
    res.status(201).json({success: true, message:"got election list", data:finallist})

  }catch(err){
    res.status(500).json({success:false, message:"server error"})
  }
}


const registerElection = async (req, res) => {
  try {
    const candidate = req.user.id;
    const eName = req.body.eName
    const electionuser = await User.findById(candidate)

    if (!electionuser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isCandidateregister= await ECandidate.findOne({candidates:candidate, electionName: eName}).populate({
      path: "candidates",
      match: { _id: candidate }
    })

    if(isCandidateregister!==null){
      return res.status(401).json({success:false, message:"already register for this election"})
    }

    const isElenull=await ECandidate.findOne({electionName:eName})
   
    if(isElenull!==null){
     await ECandidate.findOneAndUpdate({ electionName: eName},{$addToSet:{candidates: new mongoose.Types.ObjectId(candidate)}},{ new: true })

    } else{
    const newcandidate = new ECandidate({
      electionName: eName,
      candidates: [new mongoose.Types.ObjectId(candidate)]
    })
    await newcandidate.save()

    }
    res.status(201).json({ success: true, message: "candidate register successfully" })

  } catch (err) {
    res.status(500).json({ success: false, message: `failed to register for the election ${err}`, })
  }
}


const getEcandidateDetails = async (req, res) => {
  try {
    const electionlist=await Electionlist.find({isVoting: true}).select("electionname -_id")
    let earr=[]
    
    if(electionlist.length===0){
      return res.status(404).json({success:false, message:"voting is not started"})
    }
    electionlist.forEach(ele => {
      earr.push(ele.electionname)
    });
    const getlist = await ECandidate.find({electionName:{$in: earr}}).populate("candidates","_id userName")
    res.status(201).json({ success: true, message: "candidate details get successfully",data:getlist }, )
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to get details" })
  }
} 
 

const giveVote = async (req, res) => {

  try {
    const candidateN = req.body.ECandidate
    const voter = req.user.id
    const eName = req.body.eName
    const UcheckVote= await Vote.findOne({voters:voter, eName: eName}).populate({
      path: "voters",
      match: { _id: voter }
    })

  if (UcheckVote!==null) {
      return res.status(401).json({ success: false, message: "Not authorized to vote. Already voted in the election" })
    }

    const isVotenull= await Vote.findOne({eName:eName,candidateName:candidateN})
    if(isVotenull!==null){
      await Vote.findOneAndUpdate({ eName: eName,candidateName:candidateN},{$addToSet:{voters: new mongoose.Types.ObjectId(voter)}},{ new: true })

    } else{
      const newVote = new Vote({
        candidateName: candidateN,
        eName: eName,
        voters: [new mongoose.Types.ObjectId(voter)]
      })
      await newVote.save()
    }

    res.status(201).json({success:true, message: "Voted successfully"});
  } catch (err) {
    res.status(500).json({ success: false, message: `failed to give vote${err}` })
  }
}


const getResult = async (req, res) => {
  try {
    const listelec= await Electionlist.find({isResult: true}).select("electionname -_id")
    let earr=[]
    
    if(listelec.length===0){
      return res.status(404).json({success:false, message:"election result is not declared"})
    }
    listelec.forEach(ele => {
      earr.push(ele.electionname)
    });
    
    const votecount= await Vote.find({eName:{$in: earr}}).populate("candidateName","userName voters")
     

    if(votecount.length === 0){
      return res.status(404).json({success: false, message:"No votes found"})
    }
    let votingResult={} 
     
    votecount.forEach((ele) => {
      let electionName= ele.eName 
      let candidatename=ele.candidateName.userName 
      let totalvotes=ele.voters.length

      if(!votingResult[electionName]){
          votingResult[electionName]=[]
        }
     votingResult[electionName].push({ candidatename, totalvotes })    
      
    });
    res.status(201).json({success:true, message:"successfully got the election result", data:votingResult})
  

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: `Failed to get election result ${err}` });
  }
};



export { profilesave, getprofile, registerElection, getEcandidateDetails, giveVote, getResult,electionList }