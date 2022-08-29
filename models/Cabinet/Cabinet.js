import mongoose from "mongoose";

// Cabinet Schema

const CabinetSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Cabinet = mongoose.model("CabinetItem", CabinetSchema);

export default Cabinet;