import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

interface Review {
  _id?: string;
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

  const sx = {
    mb: 2,
    backgroundColor: "#ffc100",
    borderRadius: "25px",
    boxShadow: "-4px 2px 0 0 var(--dark)",
    padding: " 10px 30px",
    border: "5px solid black",
    fontFamily: "Bagel Fat One",
    color: "black",
    fontSize: "2rem",
  };

  const sx2 = {
    mb: 2,
    backgroundColor: "#0080cc",
    borderRadius: "25px",
    boxShadow: "-4px 2px 0 0 var(--dark)",
    padding: " 10px 30px",
    border: "5px solid black",
    fontFamily: "Kiwi Maru",
    color: "#ffc100",
    fontSize: "2rem",
  };

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/movies/${movieId}`);
      // console.log(response.data.movie);
      setMovie(response.data.movie);

      const reviewsResponse = await axios.get(`http://localhost:3000/api/movies/${movieId}/reviews`);
      setMovie((prevMovie) => {
        if (prevMovie === null) return null;
        return {
          ...prevMovie,
          reviews: reviewsResponse.data.reviews,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderReviewFrom = () => {
    if (!username) {
      return (
        <Card sx={sx}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontFamily: "Bagel Fat One", fontSize: "2rem", color: "black" }}
          >
            You need to
            <Button
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ fontFamily: "Bagel Fat One", padding: "0 10px 10px", fontSize: "2rem", color: " #0080cc" }}
            >
              log in
            </Button>
            to post a review.
          </Typography>
        </Card>
      );
    }

    return (
      <>
        <h2
          className="movie-title"
          style={{ marginBottom: "0px" }}
        >
          Add a Review?
        </h2>
        <div className="content-inner">
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
            sx={{ ...sx, mt: 4 }}
          >
            ADD REVIEW
          </Button>
        </div>
      </>
    );
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
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
    navigate(`/movies/${movieId}/edit`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="wrap"
        style={{ backgroundBlendMode: "overlay", backgroundColor: "#d2d2d2", backgroundImage: `url(${movie?.imageUrl})`, backgroundSize: "cover", padding: "100px 0" }}
      >
        <div className="inner">
          <img
            className="movie-image"
            src={movie?.imageUrl}
          ></img>
          <h2 className="movie-title">{movie?.title}</h2>
          <p>{movie?.rating}</p>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            {(movie?.reviews ?? []).length > 0 ? (
              movie?.reviews.map((review, index) => (
                <Grid
                  item
                  xs={6}
                  key={index}
                  sx={{ width: "48%" }}
                >
                  <Card sx={sx2}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "left", fontSize: "20px",fontFamily:"Kiwi Maru" }}
                      >
                        {review.username}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "left", fontSize: "24px",fontFamily:"Kiwi Maru" }}
                      >
                        {review.text}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "left", fontSize: "18px",fontFamily:"Kiwi Maru" }}
                      >
                        Rating: {review.rating}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => review._id && handleDelete(review._id)}
                        sx={{ width: "25%", mt: 2, display: "block", textAlign: "center" }}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card
                  sx={{ width: "50%", textAlign: "center", height: "100px", alignItems: "center", display: "flex", justifyContent: "center" }}
                >
                  <p>No reviews yet~!!</p>
                </Card>
              </Grid>
            )}
          </Grid>
          <div className="inner">
            <div className="review-flex">
              <Button
                variant="contained"
                sx={{ ...sx, width: "50%", mt: 4, mr: 2 }}
                onClick={handleEdit}
              >
                EDIT MOVIE
              </Button>
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{ ...sx, width: "50%", mt: 4 }}
              >
                BACK
              </Button>
            </div>
            {renderReviewFrom()}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
