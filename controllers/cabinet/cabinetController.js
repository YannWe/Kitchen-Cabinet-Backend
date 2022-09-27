import mongoose from 'mongoose';
import axios from 'axios';
// import Cabinet item model
import Cabinet from '../../models/cabinet/cabinet.js';

//getAllCabinets
// GET /cabinet/
export const getAllCabinets = async (req, res) => {
  try {
    const allCabinets = await Cabinet.find();
    res.status(200).json(allCabinets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get specific Cabinet
// GET /cabinet/:id
export const getCabinet = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const cabinet = await Cabinet.findById(_id);
    res.status(200).json(cabinet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get specific Cabinet by uid
// GET /cabinet/uid/:id
export const getCabinetByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const cabinet = await Cabinet.findOne({ uid });
    res.status(200).json({
      cabinetId: cabinet._id,
      diet: cabinet.diet,
      intolerance: cabinet.intolerance,
    });
    console.log(cabinet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create Cabinet
// POST /cabinet/
export const createCabinet = async (req, res) => {
  const { name, uid } = req.body;
  try {
    const newCabinet = await Cabinet.create({
      name,
      uid,
    });
    res.status(201).json(newCabinet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Edit Cabinet
// PUT /cabinet/:id
export const editCabinet = async (req, res) => {
  const { id: _id } = req.params;
  const cabinet = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('no cabinet with that id');
  try {
    const updatedCabinet = await Cabinet.findByIdAndUpdate(_id, cabinet, {
      new: true,
      runValidator: true,
    });
    console.log(updatedCabinet);
    res.status(204).json(updatedCabinet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete Cabinet
// DELETE /cabinet/:id
export const deleteCabinet = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No cabinet with that id');
  try {
    const deletedCabinet = await Cabinet.findByIdAndRemove(_id, {
      new: true,
      runValidator: true,
    });
    res
      .status(200)
      .json({ message: `${deletedCabinet.name} has been removed` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//POST /cabinet/favorite/765347663
export const addFavoriteRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const { recipeId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No cabinet with that id');
  try {
    const selectedCabinet = await Cabinet.findByIdAndUpdate(
      { _id },
      { $push: { favoriteRecipes: recipeId } },
      { new: true, runValidator: true }
    );
    selectedCabinet &&
      res.status(201).json({
        message: 'You sucessfully added one recipe to your favourites',
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET /cabinet/favorites/765347663
export const getFavoriteRecipes = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No cabinet with that id');
  try {
    const selectedCabinet = await Cabinet.findById(_id);
    const favorites = selectedCabinet.favoriteRecipes.join();

    const { data } = await axios.get(
      `http://localhost:8002/recipes/bulk?ids=${favorites}`
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//POST /cabinet/shoppinglist/765347663
export const addToShoppinglist = async (req, res) => {
  const { id: _id } = req.params;
  const { shoppinglist } = req.body;
  const selectedCabinet = await Cabinet.findById(_id);
  const cabinetShoppinglist = selectedCabinet.shoppinglist;
  const updatedShoppinglist = [...cabinetShoppinglist, ...shoppinglist];
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No cabinet with that id');
  try {
    const selectedCabinet = await Cabinet.findByIdAndUpdate(
      { _id },
      { shoppinglist: updatedShoppinglist },
      { new: true, runValidator: true }
    );
    selectedCabinet &&
      res.status(201).json({
        message: 'You sucessfully added the missing items to your shoppinglist',
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET /cabinet/shoppinglist/765347663
export const getShoppinglist = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No cabinet with that id');
  try {
    const selectedCabinet = await Cabinet.findById(_id);
    const shoppinglist = selectedCabinet.shoppinglist;
    res.status(201).json(shoppinglist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//DELETE /cabinet/shoppinglist/765347663
export const deleteShoppinglistItems = async (req, res) => {
  const { toDelete, cabinetId } = req.query;
  const toDeleteArr = toDelete.split(',').map((item) => Number(item));
  if (!mongoose.Types.ObjectId.isValid(cabinetId))
    return res.status(404).send('No cabinet with that id');
  try {
    const selectedCabinet = await Cabinet.findById(cabinetId);
    const shoppinglist = selectedCabinet.shoppinglist;
    const filteredShoppinglist = shoppinglist.filter(
      (item) => !toDeleteArr.includes(item.id)
    );
    const updatedCabinet = await Cabinet.findOneAndUpdate(
      { _id: cabinetId },
      {
        $set: {
          shoppinglist: [...filteredShoppinglist],
        },
      },
      { new: true, runValidator: true }
    );
    updatedCabinet &&
      res.status(201).json({
        message: 'You sucessfully added the missing items to your shoppinglist',
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
