import express from "express";
//import controllers
import {
  getAllCabinets,
  getCabinet,
  createCabinet,
  editCabinet,
  deleteCabinet,
  addFavouriteRecipe,
  addToShoppinglist,
} from "../controllers/cabinet/cabinetController.js";

// define router
const router = express.Router();

// CRUD

// get all cabinets
// GET /cabinet/
router.get("/", getAllCabinets);

// get specific cabinet
// GET /cabinet/:id
router.get("/:id", getCabinet);

// post new cabinet
// POST /cabinet/
router.post("/", createCabinet);

// post new favourite
// POST /cabinet/favourite/id(cabinetId)
router.put("/favourite/:id", addFavouriteRecipe);

// post shoppinglist items
// POST /cabinet/shoppinglist/id(cabinetId)
router.put("/shoppinglist/:id", addToShoppinglist);

// edit existing cabinet
// PUT /cabinet/:id
router.put("/:id", editCabinet);

// delete specific cabinet
// DELETE /cabinet/:id
router.delete("/:id", deleteCabinet);

export default router;
