const express=require("express");
    const {addRecipe,deleteRecipe}=require('../controllers/recipeController');
    const archiveMiddleware=require("../middleware/archieveMiddleware");

const router=express.Router();

router.post('/recipe',addRecipe);
router.delete('/recipe/:recipeId',archiveMiddleware,deleteRecipe);

module.exports=router;