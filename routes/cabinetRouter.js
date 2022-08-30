import express from "express";
//import controllers
import { getAllCabinets, getCabinet, createCabinet, editCabinet, deleteCabinet } from "../controllers/cabinet/cabinetController.js";

// define router
const router = express.Router()

// CRUD
// get all cabinets
router.get("/getall", getAllCabinets);
// get specific cabinet
router.get("/getcabinet/:id", getCabinet);
// post new cabinet
router.post("/addcabinet", createCabinet);
// edit existing cabinet
router.put("/editcabinet/:id", editCabinet);
// delete specific cabinet
router.delete("/deletecabinet/:id", deleteCabinet);

export default router;