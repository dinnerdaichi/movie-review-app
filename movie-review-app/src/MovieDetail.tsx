import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  const {username} = location.state || {};
  const [newReview, setNewReview] = useState<Review>({
    username: username || "",
    text: "",
    rating: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/movies/${movieId}`);
        // console.log(response.data.movie);
        setMovie(response.data.movie);
      } catch (error) {
        console.log(error);
      }
    };
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
      const response = await axios.post(`http://localhost:3000/api/movies/${movieId}/reviews`, newReview);
      const updatedMovie = response.data;
      setMovie(updatedMovie);
      setNewReview({
        username: username,
        text: "",
        rating: 0,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="inner">
        <h1>{movie?.title}</h1>
        <img src={movie?.imageUrl}></img>
        <p>{movie?.rating}</p>

        <h2>Reviews</h2>
        <p>ユーザー：{username}</p>
        {movie?.reviews.length > 0 ? (
          movie?.reviews.map((review, index) => (
            <div key={index}>
              <p>{review.username}</p>
              <p>{review.text}</p>
              <p>{review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}

        <h2>Add a Review</h2>
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
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{ width: "100%", mt: 2 }}
        >
          BACK
        </Button>
      </div>
    </>
  );
};

export default MovieDetail;
