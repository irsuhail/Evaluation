const Recipe=require('../models/Recipe');
const ArchivedRecipe=require('../models/ArchieveRecipe');

const archiveRecipe=async (req, res,next)=>{
    try {
        const Recipe=await Recipe.findById(req.params.recipeId);
        if (!recipe){
            return res.status(404).json({message:"Recipe not found"});
        }

        await new ArchivedRecipe(recipe.toObject()).save();
        next();
    } catch (error) {
        res.status(500).json({message:"Error archiving recipe"});
    }
}