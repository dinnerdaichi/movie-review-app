import express, { Express } from "express";
import connectDB from "./db/db";
import cors from "cors";
import userRoutes from "./routes/user";
import movieRoutes from "./routes/movie";

const app: Express = express();
const PORT = 3000;

connectDB();

// CORS設定を更新
app.use(cors({
  origin: [
    "https://movie-review-app-chi.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
