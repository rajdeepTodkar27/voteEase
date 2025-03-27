import jwt from "jsonwebtoken"
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
const scretekey = process.env.JWT_SCRETE;
const signup = async (req, res) => {
    try{
    const { userName,email, password } = req.body
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
       userName: userName,
       email,
       password: hashpassword
    })
    await newUser.save()
    res.status(201).json({success: true, message: "user register successfully" })
} catch(err){
    res.status(500).json({success: false, message: `somthing went wrong ${err}`})
}
}
const signin = async (req, res) => {
    try{
        const { userName, password } = req.body
       const user= await User.findOne({userName})
        if (!user){
            return res.status(404).json({success: false, message: "user not found"})
        }
        const ismatch= await bcrypt.compare(password, user.password)
        if (!ismatch){
            return res.status(400).json({success: false, message: "invalid credential"})
        }
        const token = jwt.sign({id: user._id, role: user.role}, scretekey, {expiresIn: "1h"})
        res.status(200).json({token})
    } catch(err){
        res.status(500).json({success: false, message: "somthing went wrong"})
    }
}

export { signin, signup };
