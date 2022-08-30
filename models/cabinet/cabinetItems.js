import mongoose from "mongoose";

// Cabinet Item Schema

const CabinetItemSchema = mongoose.Schema({
    cabinetId: Number, // get CabinetId 
    name: String,
    expiryDate: Date,
    amount: Number, // what about weight, volume, simple numbers (e.g.: 100ml milk, 50 grams sugar, 5 bananas)
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model("CabinetItem", CabinetItemSchema);