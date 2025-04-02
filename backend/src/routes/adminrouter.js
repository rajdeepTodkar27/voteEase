import express from "express"
import { addNewElection,closeRegistration,openVoting,declareResult,closeVoting,closeRegistrationlist,openvotingList,closeVotingList,declareResultList,candidateverify,verifyCandidatelist, getcandidateInfo,rejectCApplication } from "../controllers/admincontroller.js"
const adminrouter=express.Router()

adminrouter.get("/",(req,res)=>{
    res.send("hello admin")
})
adminrouter.get("/home",(req,res)=>{
    res.send("hello admin")
})

adminrouter.post("/setup-election", addNewElection);

adminrouter.get("/candidate-verification", candidateverify)  

// adminrouter.get("/candidate-verification/candidates", verifyCandidatelist)  
adminrouter.get("/candidate-verification/:electionName", verifyCandidatelist)  
adminrouter.put("/candidate-verification/:electionName", rejectCApplication)  
adminrouter.post("/candidate-verification/:electionName", getcandidateInfo)  


adminrouter.get("/candidate-verification/candidates/info", getcandidateInfo)  

adminrouter.get("/close-registration", closeRegistrationlist)
adminrouter.put("/close-registration", closeRegistration)

adminrouter.get("/open-voting", openvotingList)
adminrouter.put("/open-voting", openVoting)

adminrouter.get("/close-voting", closeVotingList )
adminrouter.put("/close-voting", closeVoting )

adminrouter.get("/announce-results", declareResultList)
adminrouter.put("/announce-results", declareResult)

export default adminrouter 