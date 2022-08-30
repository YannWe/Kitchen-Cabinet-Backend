import express from "express";
//import controllers
import { getAllCabinets, getCabinet, createCabinet, editCabinet, deleteCabinet } from "../controllers/cabinet/cabinetController.js";

// define router
const router = express.Router()

// CRUD
// get all items
router.get("/getall", getAllCabinets);
// get specific item
router.get("/getcabinet/:id", getCabinet);
// post new item
router.post("/addcabinet", createCabinet);
// edit existing item
router.put("/editcabinet/:id", editCabinet);
// delete specific item
router.delete("/deletecabinet/:id", deleteCabinet);

export default router;