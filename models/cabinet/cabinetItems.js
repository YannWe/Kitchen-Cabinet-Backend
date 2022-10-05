import mongoose from "mongoose";

// Cabinet Item Schema

const CabinetItemSchema = mongoose.Schema(
  {
    cabinetId: String, // get CabinetId
    name: String,
    expiryDate: String,
    amount: Number, // what about weight, volume, simple numbers (e.g.: 100ml milk, 50 grams sugar, 5 bananas),
    type: String,
    spoonId: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CabinetItem", CabinetItemSchema);
