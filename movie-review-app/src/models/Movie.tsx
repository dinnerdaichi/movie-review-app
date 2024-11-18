import mongoose, { Types } from "mongoose";

export interface IMovie extends Document {
  title: string;
  rating: number[];
  imageUrl: string;
  reviews: {
    username: string;
    text: string;
    rating: number;
    _id?: Types.ObjectId;
  }[];
  _id?: Types.ObjectId;
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  rating: { type: [Number], default: [] },
  imageUrl: { type: String, required: true, unique: true },
  reviews: [{
    username: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: false }
  }],
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);
export default Movie;
