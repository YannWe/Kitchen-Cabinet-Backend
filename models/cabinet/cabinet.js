import mongoose from "mongoose";

// Cabinet Schema

const CabinetSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CabinetItem' }]
});

export default mongoose.model("Cabinet", CabinetSchema);