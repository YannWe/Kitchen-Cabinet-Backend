import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// helpers
import { connectDB } from "./helpers/dbConnect.js";

// custom module importing
import cabinetItemRouter from "./routes/cabinetItemsRouter.js"

const server = express();

// env variables
dotenv.config();

server.use(cors());
server.use(express.json());

// using route for Cabinet items
server.use("/cabinet", cabinetItemRouter);

//Connect to DB
connectDB();

mongoose.connection.on("open", () => {
    console.log("Connected to DB")
});
mongoose.connection.on("error", (error) => {
    console.log("Connection to MongoDB has failed", error.message);
});


const PORT = process.env.PORT || 8002
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

