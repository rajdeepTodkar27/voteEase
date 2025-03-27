import User from "../models/userSchema.js";
const getdataDB=async(key,value)=>{
    const user= await User.findOne({key: value})
    return user
}
export {getdataDB}