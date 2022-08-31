import axios from "axios";
import "dotenv/config";
const API_KEY = process.env.API_KEY;

// GET /recipes/filter?query=tomato&type=breakfast&intolerances=dairy&diet=lacto-vegetarian
export const getFilteredRecipes = async (req, res) => {
  const { query, type, diet, cuisine, intolerances } = req.query;

  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&type=${type}&diet=${diet}&cuisine=${cuisine}&intolerances=${intolerances}&number=10&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: "error while fetching recipes by multi filter" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "error while fetching recipes by multi filter" });
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
        .json({ message: "error while fetching recipes by id" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error while fetching recipes by id" });
  }
};

// GET /recipes/byIngredients?ingredients=milk,sugar
export const getRecipeByIngredients = async (req, res) => {
  const { ingredients } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: "error while fetching recipes by ingredients" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "error while fetching recipes by ingredients" });
  }
};

// GET /recipes/ingredients?ingredients=apple
export const getIngredients = async (req, res) => {
  const { ingredients } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredients}&number=100&apiKey=${API_KEY}`
    );
    if (!data)
      return res
        .status(400)
        .json({ message: "error while fetching ingredients" });

    const sortedIngredients = data.results
      .map((item) => item.name)
      .filter((name) => name.includes(ingredients))
      .sort();

    res.status(200).json(sortedIngredients);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error while fetching ingredients" });
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
        .json({ message: "error while fetching instructions" });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error while fetching instructions" });
  }
};
