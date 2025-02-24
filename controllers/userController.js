const User=require('./models/User');

exports.addUser=async (req,res)=>{
    try {
        const user=new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};