import express from "express";
//import controllers
import { getAllItems, getItem, addItem, editItem, deleteItem } from "../controllers/cabinet/cabinetItemsController.js";

// define router
const router = express.Router()

// CRUD
// get all items
router.get("/item/:id", getAllItems);
// get specific item
router.get("/:id", getItem);
// post new item
router.post("/", addItem);
// edit existing item
router.put("/:id", editItem);
// delete specific item
router.delete("/:id", deleteItem);

export default router;

