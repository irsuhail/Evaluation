const Recipe=require('../models/Recipe');

exports.addRecipe=async (req,res)=>{
    try {
const recipe=new Recipe(req.body);
await recipe.save();
res.status(201).json(recipe);
    } catch (error) {
res.status(400).json({message:error.message});
    }
};

exports.deleteRecipe=async(req,res)=>{
    try {
await Recipe.findByIdAndDelete(req.params.recipeId);
res.json({message:"Recipe deleted and archived"});
    } catch (error) {
      res.status(500).json({message:"Error deleting recipe"});
    }
};