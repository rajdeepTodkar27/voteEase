import express from "express"
import { addNewElection,closeRegistration,openVoting,declareResult,closeVoting,closeRegistrationlist,openvotingList,closeVotingList,declareResultList } from "../controllers/admincontroller.js"
const adminrouter=express.Router()

adminrouter.get("/",(req,res)=>{
    res.send("hello admin")
})
adminrouter.get("/home",(req,res)=>{
    res.send("hello admin")
})

adminrouter.post("/setup-election", addNewElection);

adminrouter.get("/close-registration", closeRegistrationlist)
adminrouter.put("/close-registration", closeRegistration)

adminrouter.get("/open-voting", openvotingList)
adminrouter.put("/open-voting", openVoting)

adminrouter.get("/close-voting", closeVotingList )
adminrouter.put("/close-voting", closeVoting )

adminrouter.get("/announce-results", declareResultList)
adminrouter.put("/announce-results", declareResult)

export default adminrouter 