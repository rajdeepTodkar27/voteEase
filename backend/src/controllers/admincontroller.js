import Electionlist from "../models/electionList.js";
import ECandidate from "../models/electionCandidate.js";
import User from "../models/userSchema.js";
import Profile from "../models/profile.js";

async function getElectionlist(key,value,res) {
    try{
        const lelection= await Electionlist.find({[key]:value}).select("electionname -_id")
       
        if(lelection.length === 0){
            return res.status(404).json({success: false, message:"No match found",data:lelection})
        }
        let earr=[]
        lelection.forEach(ele => {
            earr.push(ele.electionname)
          });
       return  res.status(201).json({ success: true, message: "successfully got election details ",data:earr }, )
    } catch(err){
        return res.status(500).json({success:false, message:`somthing went wrong ${err}`})
    }
}

async function updateElectionlist(req,res,key,value,mes) {
    try{
        const ename= req.body.electionname
        Electionlist.findOneAndUpdate({electionname:ename},{$set:{[key]:value}})
        .then(isupdated=>{
            if(!isupdated){
                return res.status(404).json({success:false, message:"election name not found"})
            }
            res.status(201).json({success:true, message:`successfully updated the election list-${mes}`})
        })
        .catch(err=>res.status(500).json({success: true, message:`something went wrong ${err}`}))
    } catch(err){
        res.status(500).json({success: true, message:`something went wrong ${err}`})
    } 
}

const addNewElection=async(req,res)=>{
    try{
    const {electionname}=req.body
    const newElection=new Electionlist({
        electionname: electionname,
    })
    await newElection.save()
    res.status(201).json({success:true, message:"election created successfully"})
} catch(err){
    res.status(500).json({success:false, message: "failed to create election"})
}
}


const candidateverify= async (req,res)=>{await getElectionlist("isRegistration", true, res)}



const verifyCandidatelist= async (req,res)=>{
   
    const electionName = decodeURIComponent(req.params.electionName);
    
    try{
        const listCandidates= await ECandidate.findOne({electionName: electionName }).populate("candidates","_id userName")
        if(!listCandidates){
            return res.status(404).json({success:false, message:"No candidate register"})
        }
        res.status(201).json({success:true, message:"successfully got the candidate data", data: listCandidates})

    }catch(err){
        res.status(500).json({success:false, message:`somthing went wrong ${err}`})
    }
    
}
const getcandidateInfo= async (req,res)=>{
    try {
        const candidatename= req.headers.candidatename
        console.log(req.headers);
        
        const user = await User.findOne({userName: candidatename})
        const isProfile = await Profile.findOne({ user: user._id })
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


const rejectCApplication= async (req,res)=>{
    try{
        const candidateid =req.body.candidateid
        const electionName = decodeURIComponent(req.params.electionName);
        const updatedlist= await ECandidate.findOneAndUpdate({electionName:electionName},{$pull: {candidates: candidateid}},{ new: true })
        if(!updatedlist){
            return res.status(404).json({success: false, message:"failed to remove the candidate from the election list"})
        }
        res.status(201).json({success:true, message:"successfully removed the candidate from the election list"})
    } catch(err){
        res.status(500).json({success:false, message:`somthing went wrong ${err}`})
    }
}

const closeRegistrationlist=async(req,res)=>{ await getElectionlist("isRegistration", true, res)}
const closeRegistration=async(req,res)=>{ await updateElectionlist(req,res,"isRegistration", false, "Registraton closed")}

const openvotingList=async (req,res) => {await getElectionlist("isVoting", false, res) }
const openVoting=async(req,res)=>{ await updateElectionlist(req,res,"isVoting", true, "Voting opened")}

const closeVotingList=async(req,res)=>{await getElectionlist("isVoting",true,res)}
const closeVoting=async(req,res)=>{ await updateElectionlist(req,res, "isVoting", false, "Voting closed")}

const declareResultList=async(req,res)=>{await getElectionlist("isResult", false, res)}
const declareResult=async(req,res)=>{ await updateElectionlist(req,res,"isResult", true, "election Result declared")}

export {addNewElection,closeRegistration,openVoting,declareResult,closeVoting,closeRegistrationlist,openvotingList,closeVotingList,declareResultList,candidateverify,verifyCandidatelist,getcandidateInfo,rejectCApplication}