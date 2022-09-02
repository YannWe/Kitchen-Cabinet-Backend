import mongoose from "mongoose";
// import Cabinet item model
import Cabinet from "../../models/cabinet/cabinet.js";

//getAllCabinets
// GET /cabinet/
export const getAllCabinets = async (req, res) => {
    try {
        const allCabinets = await Cabinet.find()
        // console.log(allItems)
        res.status(200).json(allCabinets);
    } catch (error) {
        res.status(404).json({ message: error.message })
    };
};

// get specific Cabinet
// GET /cabinet/:id
export const getCabinet = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const cabinet = await Cabinet.findById(_id);
        res.status(200).json(cabinet);
    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

// create Cabinet
// POST /cabinet/
export const createCabinet = async (req, res) => {
    const { name } = req.body;
    try {
        const newCabinet = await Cabinet.create({
            name
        })
        res.status(201).json(newCabinet)
    } catch (error) {
        res.status(404).json({ message: error.message })
    };
};

// Edit Cabinet
// PUT /cabinet/:id
export const editCabinet = async (req, res) => {
    const { id: _id } = req.params;
    const cabinet = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no cabinet with that id")
    try {
        const updatedCabinet = await Cabinet.findByIdAndUpdate(_id, cabinet, { new: true, runValidator: true });
        console.log(updatedCabinet)
        res.status(204).json(updatedCabinet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};

// delete Cabinet
// DELETE /cabinet/:id
export const deleteCabinet = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No cabinet with that id")
    try {
        const deletedCabinet = await Cabinet.findByIdAndRemove(_id, { new: true, runValidator: true });
        res.status(200).json({ message: `${deletedCabinet.name} has been removed` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};