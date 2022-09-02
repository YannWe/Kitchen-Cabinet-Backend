import express from "express";
//import controllers
import { getAllItems, getItem, addItem, editItem, deleteItem } from "../controllers/cabinet/cabinetItemsController.js";

// define router
const router = express.Router()

// CRUD
// get all items
// GET /cabinet/
router.get("/all/:id", getAllItems);
// get specific item
// GET /cabinet/items/:id
router.get("/:id", getItem);
// post new item
// POST cabinet/items/
router.post("/", addItem);
// edit existing item
// PUT /cabinet/items/:id
router.put("/:id", editItem);
// delete specific item
// DELETE /cabinet/items/:id
router.delete("/:id", deleteItem);

export default router;

