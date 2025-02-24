const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String, required:true, minlength:3},
    email:{type:String,required:true,unique:true},
    createdAt:{type:Date,default:Date.now},
});

module.exports=mongoose.model("User",userSchema);