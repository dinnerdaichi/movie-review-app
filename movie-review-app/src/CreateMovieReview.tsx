import { Button,Rating, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Reviews } from "./interface/Reviews";
import { useNavigate } from "react-router-dom";




const CreateMovieReview: React.FC<{ addReview: (newReview: Reviews) => void }> = ({ addReview }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [content, setContent] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(event.target.files![0]));
  };

  const handlesubmit = () => {
    const newReview = {
      id: Math.random().toString(),
      title: title,
      content: content,
      image: image,
      rating: rating,
      userId: "1",
    };


    addReview(newReview);

    setTitle("");
    setImage("");
    setRating(null);
    setContent("");

    handleclick()
  };

  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/");
  }
  return (
    <>
      <h1>Let`s Create Review!</h1>
      <div>
        <Stack spacing={2}>
          <TextField
            label="title"
            onChange={handleInputChange}
          ></TextField>

          <Button
            variant="contained"
            component="label"
          >
            Add image
            <input type="file" onChange={handleImageChange} />
          </Button>

          <Rating
            name="half-rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            defaultValue={2.5}
            precision={0.5}
            max={10}
          />

          <TextField
            multiline
            rows={4}
            label="content"
            onChange={(event) => setContent(event.target.value)}
          ></TextField>
        </Stack>
      </div>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handlesubmit}
      >
        CREATE
      </Button>
    </>
  );
};

export default CreateMovieReview