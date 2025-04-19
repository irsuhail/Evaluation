const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    Password:String,
    role:{type:String,enum:["admin","user"],default:"user"},

});

model.exports=mongoose.model("User",userSchema);