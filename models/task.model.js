const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    name:String,
    description:String,
    status:{type:String,enum:["pending","completed"],default:"user"},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdAt:{type:Date,default:Date.now},

});

model.exports=mongoose.model("Task",taskSchema);