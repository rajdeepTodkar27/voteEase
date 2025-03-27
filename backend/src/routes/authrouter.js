import express from "express";
import { signin,signup } from "../controllers/authcontroller.js";
const authrouter=express.Router();

authrouter.post("/signin", signin);
authrouter.get("/signin", (req,res)=>{
    res.send("hello")
});
authrouter.post("/signup", signup);

export default authrouter;