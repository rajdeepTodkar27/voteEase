import Electionlist from "../models/electionList.js";


async function getElectionlist(key,value,res) {
    try{
        const lelection= await Electionlist.find({[key]:value}).select("electionname -_id")
       
        if(lelection.length === 0){
            return res.status(404).json({success: true, message:"No match found",data:lelection})
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


const closeRegistrationlist=async(req,res)=>{ await getElectionlist("isRegistration", true, res)}
const closeRegistration=async(req,res)=>{ await updateElectionlist(req,res,"isRegistration", false, "Registraton closed")}

const openvotingList=async (req,res) => {await getElectionlist("isVoting", false, res) }
const openVoting=async(req,res)=>{ await updateElectionlist(req,res,"isVoting", true, "Voting opened")}

const closeVotingList=async(req,res)=>{await getElectionlist("isVoting",true,res)}
const closeVoting=async(req,res)=>{ await updateElectionlist(req,res, "isVoting", false, "Voting closed")}

const declareResultList=async(req,res)=>{await getElectionlist("isResult", false, res)}
const declareResult=async(req,res)=>{ await updateElectionlist(req,res,"isResult", true, "election Result declared")}

export {addNewElection,closeRegistration,openVoting,declareResult,closeVoting,closeRegistrationlist,openvotingList,closeVotingList,declareResultList}