import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// custom module importing


const server = express();

// env variables
dotenv.config();

server.use(cors());
server.use(express.json());

// using route for Cabinet items
server.use("/cabinet", cabinetRouter)

connectDB();


mongoose.connection.on("open", () => {
    console.log("Connected to DB")
});
mongoose.connection.on("error", (error) => {
    console.log("Connection to MongoDB has failed", error.message);
});


const PORT = process.env.PORT || 8000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

