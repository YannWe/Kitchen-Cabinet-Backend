import express from "express";
// import controllers
import {
  getFilteredRecipes,
  getIngredients,
  getRecipeById,
  getRecipeByIngredients,
  getRecipeInstructions,
  getIngredientType,
  getRecipeInformationBulk,
} from "../controllers/recipes/recipesController.js";

// define router
const router = express.Router();

// GET complex filter
router.get("/filter", getFilteredRecipes);
//get information for filtering
router.get("/bulk", getRecipeInformationBulk);
// GET by id
router.get("/id/:id", getRecipeById);
// GET by ingredients
router.get("/byIngredients", getRecipeByIngredients);
// GET available ingredient names and ids
router.get("/ingredient", getIngredients);
// GET ingredient type
router.get("/ingredientType/:id", getIngredientType);
// GET instructions for specific recipe
router.get("/instructions/:id", getRecipeInstructions);

export default router;
