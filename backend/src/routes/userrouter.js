import express from "express"
import { profilesave,getprofile,registerElection,getEcandidateDetails,giveVote, getResult,electionList } from "../controllers/usercontroller.js";

const userrouter=express.Router()

userrouter.get("/", (req,res)=>{
    res.send("this is user")
})

userrouter.get("/home", (req,res)=>{
        res.send("this is home")
})

userrouter.get("/electionregister", electionList)
userrouter.post("/electionregister", registerElection)


userrouter.get("/profile",getprofile)
userrouter.post("/profile", profilesave )

userrouter.get("/vote", getEcandidateDetails)
userrouter.post("/vote", giveVote)

userrouter.get("/checkresult", getResult)

export default userrouter;