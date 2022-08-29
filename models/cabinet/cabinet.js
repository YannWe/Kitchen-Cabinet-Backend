import mongoose from "mongoose";

// Cabinet Schema

const CabinetSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model("Cabinet", CabinetSchema);