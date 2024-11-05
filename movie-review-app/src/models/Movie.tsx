import mongoose from "mongoose";

export interface IMovie extends Document {
  title: string;
  rating: number;
  imageUrl: string;
  reviews:
    {
      username: string;
      text: string;
      rating: number;
    }[];


}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      username: { type: String, required: true },
      text: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
  imageUrl: { type: String, required: true, unique: true },
});

const Movie = mongoose.model<IMovie>('Movie', movieSchema);
export default Movie