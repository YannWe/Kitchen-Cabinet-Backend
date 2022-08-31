import mongoose from "mongoose";

// Cabinet Schema

const CabinetSchema = mongoose.Schema({
    name: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CabinetItem' }]
    
}, {
    timestamps: true
});

export default mongoose.model("Cabinet", CabinetSchema);