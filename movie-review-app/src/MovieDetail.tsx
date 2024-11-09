import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";

interface Review {
  username: string;
  text: string;
  rating: number;
}

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  rating?: number;
  reviews: Review[];
}

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const location = useLocation();
  const { username } = location.state || {};
  const [newReview, setNewReview] = useState<Review>({
    username: username || "",
    text: "",
    rating: 0,
  });
  const navigate = useNavigate();

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/movies/${movieId}`);
      // console.log(response.data.movie);
      setMovie(response.data.movie);

      const reviewsResponse = await axios.get(`http://localhost:3000/api/movies/${movieId}/reviews`);
      setMovie((prevMovie) => ({
        ...prevMovie,
        reviews: reviewsResponse.data.reviews,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!newReview.text || newReview.rating < 1) {
      alert("レビューを入力してください");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/movies/${movieId}/reviews`, newReview);
      fetchMovie();
      setNewReview({
        username: username,
        text: "",
        rating: newReview.rating || 0,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/movies/${movieId}/reviews/${reviewId}`);
      fetchMovie();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigate("/movies/${movieId}/edit");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="inner">
        <img
          className="movie-image"
          src={movie?.imageUrl}
        ></img>
        <h2>{movie?.title}</h2>
        <p>{movie?.rating}</p>
        <Grid container>
          {(movie?.reviews ?? []).length > 0 ? (
            movie?.reviews.map((review, index) => (
              <Grid
                item
                xs={6}
                key={index}
                sx={{ width: "50%", mr: 2 }}
              >
                <Card sx={{ width: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "left", fontSize: "20px" }}
                    >
                      reviewer:{review.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left", fontSize: "24px" }}
                    >
                      {review.text}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left", fontSize: "18px" }}
                    >
                      Rating: {review.rating}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(review._id)}
                      sx={{ width: "20%", mt: 2, display: "block", textAlign: "center" }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Card
              item
              xs={12}
              sx={{ width: "100%" }}
            >
              <p>No reviews yet</p>
            </Card>
          )}
        </Grid>
        <Button
          variant="contained"
          sx={{ width: "400px", mt: 4 }}
          onClick={handleEdit}
        >
          EDIT
        </Button>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{ width: "400px", mt: 4 }}
        >
          BACK
        </Button>

        <div className="content-inner">
          <h2>Add a Review?</h2>
          <Stack spacing={2}>
            <TextField
              label="レビュー"
              name="text"
              value={newReview.text}
              onChange={handleChange}
            ></TextField>
            <TextField
              label="評価"
              name="rating"
              type="number"
              value={newReview.rating}
              onChange={handleChange}
            ></TextField>
          </Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ width: "100%", mt: 2 }}
          >
            ADD REVIEW
          </Button>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
