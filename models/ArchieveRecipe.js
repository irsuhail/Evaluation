const mongoose=require("mongoose");

const archivedRecipeSchema=new mongoose.Schema({
    titel:String,
    description:String,
    ingredients:[String],
    instructions:String,
    author:mongoose.Schema.Types.ObjectId,
    views:Number,
    createdAt:Date,
    archiveAt:{type:Date,default:Date.now},
});

module.exports=mongoose.model("ArchiveRecipe",archivedRecipeSchema);