const authrole=(...allowedroles)=>{
    return (req,res,next)=>{
        if(!allowedroles.includes(req.user.role)){
            return res.status(403).json({message: "access denied"})
        }
        next()
    }
}

export default authrole;