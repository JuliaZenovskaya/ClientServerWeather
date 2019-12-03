import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const FavouritesSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('FavouriteCity', FavouritesSchema);
