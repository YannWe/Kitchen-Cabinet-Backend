import mongoose from "mongoose";
// import Cabinet item model
import CabinetItem from "../../models/cabinet/cabinetItems.js";


//getAllItems from Cabinet
export const getAllItems = async (req, res) => {
    try {
        const allItems = await CabinetItem.find()
        // console.log(allItems)
        res.status(200).json(allItems);
    } catch (error) {
        res.status(404).json({ message: error.message })
    };
};

// get specific Item from Cabinet
export const getItem = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const item = await CabinetItem.findById(_id);
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

// add Item to Cabinet
export const addItem = async (req, res) => {
    const { name, expiryDate, amount } = req.body;
    try {
        const newItem = await CabinetItem.create({
            name,
            expiryDate,
            amount,
        })
        res.status(201).json(newItem)
    } catch (error) {
        res.status(404).json({ message: error.message })
    };
};

// edit Item from Cabinet
export const editItem = async (req, res) => {
    const { id: _id } = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no item with that id")
    try {
        const updatedItem = await CabinetItem.findByIdAndUpdate(_id, item, { new: true });
        console.log(updatedItem)
        res.status(204).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};

// delete Item from Cabinet
export const deleteItem = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No item with that id")
    try {
        const deletedItem = await CabinetItem.findByIdAndRemove(_id);
        res.status(200).json({ message: `${deletedItem.name} has been removed` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};
