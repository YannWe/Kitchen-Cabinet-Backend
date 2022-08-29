import express from "express";

//import controllers

// define router
const router = express.Router()

// CRUD
// get all items
router.get("/getall", getAllItems);
// get specific item
router.get("getitem", getItem);
// post new item
router.post("additem", addItem);
// edit existing item
router.put("edititem", editItem);
// delete specific item
router.delete("deleteitem", deleteItem);

export default router;

