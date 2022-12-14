import mongoose from 'mongoose';

// Cabinet Schema

const CabinetSchema = mongoose.Schema(
  {
    // add in user Id
    name: String,
    uid: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CabinetItem' }],
    favoriteRecipes: [],
    shoppinglist: [],
    diet: String,
    intolerance: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cabinet', CabinetSchema);
