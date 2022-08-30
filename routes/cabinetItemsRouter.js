import express from "express";
//import controllers
import { getAllItems, getItem, addItem, editItem, deleteItem } from "../controllers/cabinet/cabinetItemsController.js";

// define router
const router = express.Router()

// CRUD
// get all items
router.get("/getall", getAllItems);
// get specific item
router.get("/getitem/:id", getItem);
// post new item
router.post("/additem", addItem);
// edit existing item
router.put("/edititem/:id", editItem);
// delete specific item
router.delete("/deleteitem/:id", deleteItem);

export default router;

