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

### CRUD

1. POST Item
2. GET All Item
3. GET specific Item
4. PUT Item
5. DELETE Item

Process:

1. POST new Cabinet A
2. POST new item A for Cabinet A
3. PUT new item

### Connect to Spoonacular

### Endpoints for get requests

1. get filtered recipes\
   GET /recipes/filter?query=tomato&type=breakfast&intolerances=dairy&diet=lacto-vegetarian
2. get recipes by id\
   GET /recipes/id/659604
3. get recipes by ingredients\
   GET /recipes/byIngredients?ingredients=milk,sugar
4. get available ingredients names\
   GET /recipes/ingredients?ingredients=apple
5. get instructions for specific recipe\
   GET /recipes/instructions/659604
