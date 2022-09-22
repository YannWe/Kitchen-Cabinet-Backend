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
} from '../controllers/cabinet/cabinetController.js';

// define router
const router = express.Router();

// CRUD

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

// post new favourite
// POST /cabinet/favourite/id(cabinetId)
router.post('/favorites/:id', addFavoriteRecipe);

// get favourites
// GET /cabinet/favourite/id(cabinetId)
router.get('/favorites/:id', getFavoriteRecipes);

// post shoppinglist items
// POST /cabinet/shoppinglist/id(cabinetId)
router.post('/shoppinglist/:id', addToShoppinglist);

// get shoppinglist
// GET /cabinet/shoppinglist/id(cabinetId)
router.get('/shoppinglist/:id', getShoppinglist);

// edit existing cabinet
// PUT /cabinet/:id
router.put('/:id', editCabinet);

// delete specific cabinet
// DELETE /cabinet/:id
router.delete('/:id', deleteCabinet);

export default router;
