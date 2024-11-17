import express from "express";
import { Request, Response } from "express";
import Movie from "../models/Movie";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    const newMovie = new Movie({ title, imageUrl });
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding movie" });
  }
});

// 映画全体の取得

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movies" });
  }
});

// 映画詳細取得
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({ movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movie" });
  }
});

// 映画レビュー投稿
router.post("/:id/reviews", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const newReview = {
      username: req.body.username,
      text: req.body.text,
      rating: req.body.rating,
    };

    movie.reviews.push(newReview);
    await movie.save();
    res.status(200).json({ movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movie" });
  }
});

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movie.reviews = movie.reviews.filter((review) => review._id.toString() !== reviewId);
    await movie.save();
    res.status(200).json({ message: "Review deleted successfully", reviews: movie.reviews });
  } catch (error) {
    console.error(error);
  }
});

// 映画編集
router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(id, { title, imageUrl }, { new: true, runValidators: true, select: "-reviews" });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error) {
    console.error(error);
  }
});

export default router;
