import express from "express";
import dotenv from "dotenv";
/* import cors from "cors"; */
import mongoose from "mongoose";

// helpers
import { connectDB } from "./helpers/dbConnect.js";

// custom module importing
import cabinetItemRouter from "./routes/cabinetItemsRouter.js"
import cabinetRouter from "./routes/cabinetRouter.js"
import recipesRouter from "./routes/recipesRouter.js";
import requestLogger from "./middlewares/requestLogger.js";

const server = express();

// env variables
dotenv.config();

/* server.use(cors()); */
server.use(express.json());

// logging
server.use(requestLogger);
// using route for Cabinet items
server.use("/cabinet/items", cabinetItemRouter);
//using route for Cabinet
server.use("/cabinet", cabinetRouter)
//using route for Recipes (Spoonacular API)
server.use("/recipes", recipesRouter);

//Connect to DB
connectDB();

mongoose.connection.on("open", () => {
    console.log("Connected to DB")
});
mongoose.connection.on("error", (error) => {
    console.log("Connection to MongoDB has failed", error.message);
});


const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

