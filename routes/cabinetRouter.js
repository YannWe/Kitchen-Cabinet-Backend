import express from "express";
//import controllers
import { getAllCabinets, getCabinet, createCabinet, editCabinet, deleteCabinet } from "../controllers/cabinet/cabinetController.js";

// define router
const router = express.Router()

// CRUD
// get all cabinets
router.get("/", getAllCabinets);
// get specific cabinet
router.get("/:id", getCabinet);
// post new cabinet
router.post("/", createCabinet);
// edit existing cabinet
router.put("/:id", editCabinet);
// delete specific cabinet
router.delete("/:id", deleteCabinet);

export default router;