import mongoose from "mongoose";
import axios from "axios";
import Cabinet from "../../models/cabinet/cabinet.js";
// import Cabinet item model
import CabinetItem from "../../models/cabinet/cabinetItems.js";

//getAllItems from Cabinet
// GET /cabinet/items/all/:id
export const getAllItems = async (req, res) => {
    const { id: cabinetId } = req.params;
    try {
        const allItems = await CabinetItem.find({ cabinetId: cabinetId });
        res.status(200).json(allItems);
    } catch (error) {
        res.status(404).json({ message: error.message })
    };
};

// get specific Item by Id
// GET /cabinet/items/:id
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
// POST cabinet/items/
export const addItem = async (req, res) => {
  const { cabinetId, id, expiryDate, amount } = req.body;
  try {
    // getType from spoonacular
    //
    const { data } = await axios.get(
      `http://localhost:8002/recipes/ingredientType/${id}`
    );
    const { type, name } = data;
    // creating the new item
    const newItem = await CabinetItem.create({
      cabinetId,
      name,
      expiryDate,
      amount,
      spoonId: id,
      type: type[0],
    });
    // linking the item to the parent Cabinet
    const selectedCabinet = await Cabinet.findByIdAndUpdate(
      { _id: cabinetId },
      { $push: { items: newItem._id } },
      { new: true, runValidator: true }
    );
    res.status(201).json(selectedCabinet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// edit Item from Cabinet
// PUT /cabinet/items/:id
export const editItem = async (req, res) => {
    const { id: _id } = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no item with that id")
    try {
        const updatedItem = await CabinetItem.findByIdAndUpdate(_id, item, { new: true, runValidator: true });
        console.log(updatedItem)
        res.status(204).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};

// delete Item from Cabinet
// DELETE /cabinet/items/:id
export const deleteItem = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No item with that id")
    try {
        // delete item 
        const deletedItem = await CabinetItem.findByIdAndRemove(_id, { new: true, runValidator: true });
        // remove reference to item from parent Cabinet 
        const selectedCabinet = await Cabinet.findOneAndUpdate({ _id: deletedItem.cabinetId }, { $pull: { items: { $in: [deletedItem._id] } } }, { new: true, runValidator: true });
        res.status(201).json(selectedCabinet);
        // res.status(201).json({ message: `${deletedItem.name} has been removed` }, selectedCabinet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};
