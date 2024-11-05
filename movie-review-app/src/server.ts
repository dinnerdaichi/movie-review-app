import express from "express";
import connectDB from "./db/db";
import cors from "cors";
import userRoutes from "./routes/user";
import movieRoutes from "./routes/movie";

const app = express();
const PORT = 3000;

connectDB();

app.use(cors({
  origin: "http://localhost:5173"
}))



app.use(express.json());

app.use('/api',userRoutes);
app.use('/api/movies', movieRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
