import express from "express";
// import controllers
import {
  getFilteredRecipes,
  getIngredients,
  getRecipeById,
  getRecipeByIngredients,
  getRecipeInstructions,
} from "../controllers/recipes/recipesController.js";

// define router
const router = express.Router();

// GET complex filter
router.get("/filter", getFilteredRecipes);
// GET by id
router.get("/id/:id", getRecipeById);
// GET by ingredients lax default (exact=true) as query
router.get("/byIngredients", getRecipeByIngredients);
// GET available ingredients names
router.get("/ingredients", getIngredients);
// GET instructions for specific recipe
router.get("/instructions/:id", getRecipeInstructions);

export default router;
