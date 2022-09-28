import axios from 'axios';
import 'dotenv/config';
const API_KEY = process.env.API_KEY;
import Cabinet from '../../models/cabinet/cabinet.js';

// GET /recipes/filter?type=breakfast&intolerances=dairy&diet=lacto-vegetarian&ids=6543,6543,6543
export const getFilteredRecipes = async (req, res) => {
  const { type, diet, intolerance, extras, ids } = req.query;
  try {
    const { data } = await axios.get(
      `http://localhost:8002/recipes/bulk?ids=${ids}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: 'error while fetching information bulk' });

    const filteredRecipes = data.filter((item) => {
      return (
        (!diet || item[diet]) &&
        (!type || item.dishTypes.includes(type)) &&
        (!intolerance ||
          item.extendedIngredients.every(
            (item) =>
              item.name !== intolerance.toLowerCase() ||
              item.name !== intolerance.toLowerCase() + 's'
          )) &&
        (!extras ||
          (extras === 'readyInMinutes'
            ? item.readyInMinutes < 30
            : item[extras]))
      );
    });
    const filteredRecipesIds = filteredRecipes.map((item) => item.id);

    res.status(200).json(filteredRecipesIds);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: 'error while fetching recipes by multi filter' });
  }
};

// GET /recipes/id/659604
export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: 'error while fetching recipes by id' });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error while fetching recipes by id' });
  }
};

// GET /recipes/byIngredients?cabinetId=6748365&ingredients=milk,sugar
export const getRecipeByIngredients = async (req, res) => {
  const { ingredients, cabinetId: _id } = req.query;

  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ignorePantry=false&number=10&apiKey=${API_KEY}`
    );
    const selectedCabinet = await Cabinet.findById(_id);
    const { intolerance, diet } = selectedCabinet;
    if (intolerance || diet) {
      // add preset Filter
      const recipeIds = data.map((item) => item.id).join(',');
      const { data: prefilteredRecipesIds } = await axios.get(
        `http://localhost:8002/recipes/filter?&intolerance=${intolerance}&diet=${diet}&ids=${recipeIds}`
      );
      const prefilteredRecipes = data.filter((item) =>
        prefilteredRecipesIds.includes(item.id)
      );
      if (!data)
        return res
          .status(400)
          .json({ message: 'error while fetching recipes by ingredients' });

      return res.status(200).json(prefilteredRecipes);
    } else {
      if (!data)
        return res
          .status(400)
          .json({ message: 'error while fetching recipes by ingredients' });
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: 'error while fetching recipes by ingredients' });
  }
};

// GET /recipes/ingredient?ingredient=apple

export const getIngredients = async (req, res) => {
  const { ingredient } = req.query;

  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&number=15&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: 'error while fetching ingredients' });

    res.status(200).json(data.results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error while fetching ingredients' });
  }
};

// get recipe information for Filtering process

//GET recipes/bulk?ids=648767,716422
export const getRecipeInformationBulk = async (req, res) => {
  const { ids } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: 'error while fetching ingredients' });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error while fetching ingredients' });
  }
};

// GET ingredientType & Image
// GET /recipes/ingredientType/11529
export const getIngredientType = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: 'error while fetching ingredients' });
    res.status(200).json({
      type: data.categoryPath.slice(-1),
      name: data.name,
      id: data.id,
      image: data.image,
    });
  } catch (error) {
    res.status(400).json({ message: 'error while fetching ingredients' });
  }
};

// GET /recipes/instructions/659604
export const getRecipeInstructions = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: 'error while fetching instructions' });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error while fetching instructions' });
  }
};
