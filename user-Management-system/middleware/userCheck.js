const User=require("../models/User");

const userCheck=async (req,res,next)=>{
    try {
       const userId=req.body.userId || req.query.userId;

       if (!userId){
        return res.status(400).json({error:"User ID is required"});
       }

       const userExists=await User.findOne({userId});

       if (!userExists){
        return res.status(404).json({error:"User not found"});
       }
       next();
       
    } catch (error) {
        res.status(500).json({error:"Server error"});
    }
};

module.exports=userCheck;