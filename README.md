# Kitchen-Cabinet-Backend

## MVP Backend

Req's:

1. Schema for the Ingredients
2. Schema for Kitchen Cabinet
3. Basic CRUD
4. Project specific MongoDB

### Ingredient (Item) Schema

cabinetId
name
expiryDate
amount
createdAt
\_id

### Kitchen Cabinet Schema

name
createdAt
\_id

### CRUD Ingredients (Items)
1. POST Item
    /cabinet/items/
2. GET All Item
    /cabinet/items/all/630dff86aa1ea3a726d5c230
3. GET specific Item
    /cabinet/items/630dffc8aa1ea3a726d5c232
4. PUT Item
    /cabinet/items/630dffc8aa1ea3a726d5c232
5. DELETE Item
    /cabinet/items/630dffc8aa1ea3a726d5c232

### CRUD Cabinets
1. POST Cabinet
    /cabinet/
2. GET All Cabinets
    /cabinet/
3. GET specific Cabinet
    /cabinet/630dff86aa1ea3a726d5c230
4. PUT Cabinet
    /cabinet/630dff86aa1ea3a726d5c230
5. DELETE Cabinet
    /cabinet/630dff86aa1ea3a726d5c230

### Connect to Spoonacular

### Endpoints for get requests

1. get filtered recipes\
   GET /recipes/filter?query=tomato&type=breakfast&intolerances=dairy&diet=lacto-vegetarian
2. get recipes by id\
   GET /recipes/id/659604
3. get recipes by ingredients\
   GET /recipes/byIngredients?ingredients=milk,sugar
4. get available ingredients names and ids\
   GET /recipes/ingredient?ingredient=apple
5. get instructions for specific recipe\
   GET /recipes/instructions/659604
6. get ingredientType by ingredientId\
   GET /recipes/ingredientType/11529
