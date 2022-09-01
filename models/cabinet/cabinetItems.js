import mongoose from "mongoose";

// Cabinet Item Schema

const CabinetItemSchema = mongoose.Schema({
    cabinetId: String, // get CabinetId 
    name: String,
    expiryDate: Date,
    amount: Number, // what about weight, volume, simple numbers (e.g.: 100ml milk, 50 grams sugar, 5 bananas)
}, {
    timestamps: true
});

export default mongoose.model("CabinetItem", CabinetItemSchema);