const mongoose=require("mongoose");

const recipeSchema=new mongoose.Schema({
    title:{type:String,required:true,minlength:3},
    description:String,
    ingredients:{type:[String],required:true},
    instructions:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    views:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now},
});

module.exports=mongoose.model("Recipe",recipeSchema);