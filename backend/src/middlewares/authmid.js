import jwt from "jsonwebtoken"

const verifytoken=(req,res,next)=>{
    let token
    const auth=req.headers.authorization || req.headers.Authorization 
    if(auth && auth.startsWith("Bearer")){
        token=auth.split(" ")[1]
    
    if(!token){
        return res.status(401).json({success: false, message: "no token, authorization denied"})
    }
    try{
        
        const decode = jwt.verify(token, process.env.JWT_SCRETE)
        req.user=decode
        next()
    } catch (err){
        return res.status(400).json({success: false, message: "token is not valid"})
    }
} else{
    return res.status(401).json({success: false, message: "no token, authorization denied"})
}
   
}

export default verifytoken;