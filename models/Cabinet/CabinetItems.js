import mongoose from "mongoose";

// Cabinet Item Schema

const CabinetItemSchema = mongoose.Schema({
    cabinetId: Number, // get CabinetId
    name: String,
    expiryDate: String,
    amount: Number, // what about weight, volume, simple numbers (e.g.: 100ml milk, 50 grams sugar, 5 bananas)
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const CabinetItem = mongoose.model("CabinetItem", CabinetItemSchema);

export default CabinetItem;