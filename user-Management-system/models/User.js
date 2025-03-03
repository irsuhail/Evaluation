const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    profileImage:{type:String}
},{timestamps:true});

const User=mongoose.model("User",userSchema);

module.exports=User;