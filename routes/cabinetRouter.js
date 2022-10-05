import express from 'express';
//import controllers
import {
  getAllCabinets,
  getCabinet,
  createCabinet,
  editCabinet,
  deleteCabinet,
  addFavoriteRecipe,
  addToShoppinglist,
  getCabinetByUid,
  getFavoriteRecipes,
  getShoppinglist,
  deleteShoppinglistItems,
  postPreferences,
  getPreferences,
  deleteFavoriteRecipe,
} from '../controllers/cabinet/cabinetController.js';

const router = express.Router();

// CABINET

// get all cabinets
// GET /cabinet/
router.get('/', getAllCabinets);

// get specific cabinet
// GET /cabinet/:id
router.get('/:id', getCabinet);

// get specific cabinet
// GET /cabinet/uid/:uid
router.get('/uid/:uid', getCabinetByUid);

// post new cabinet
// POST /cabinet/
router.post('/', createCabinet);

// edit existing cabinet
// PUT /cabinet/:id
router.put('/:id', editCabinet);

// delete specific cabinet
// DELETE /cabinet/:id
router.delete('/:id', deleteCabinet);

// FAVORITES

// POST /cabinet/favourite/id(cabinetId)
router.post('/favorites/:id', addFavoriteRecipe);

// GET /cabinet/favourite/id(cabinetId)
router.get('/favorites/:id', getFavoriteRecipes);

// DELETE /cabinet/favorites/45435?recipeId=5432
router.delete('/favorites/:id', deleteFavoriteRecipe);

// POST /cabinet/shoppinglist/id(cabinetId)
router.post('/shoppinglist/:id', addToShoppinglist);

// SHOPPINGLIST

// GET /cabinet/shoppinglist/id(cabinetId)
router.get('/shoppinglist/:id', getShoppinglist);

// DELETE /cabinet/shoppinglist/id(cabinetId)
router.delete('/shoppinglist', deleteShoppinglistItems);

// PREFERENCES

// POST /cabinet/preferences/id(cabinetId)
router.post('/preferences/:id', postPreferences);

// GET /cabinet/preferences/id(cabinetId)
router.get('/preferences/:id', getPreferences);

export default router;
