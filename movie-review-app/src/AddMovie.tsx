import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    try {
      await axios.post("http://localhost:3000/api/movies/add", {
        title: title,
        imageUrl: imageUrl,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const BackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="inner">
        <h1>ADD MOVIE</h1>
        <div>
          <Stack spacing={2}>
            <TextField
              label="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></TextField>
            <TextField
              label="imagePass"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            ></TextField>
          </Stack>
        </div>
        <Button
          sx={{ mt: 2, mr: 2 }}
          variant="contained"
          onClick={handleSubmit}
        >
          ADD MOVIE
        </Button>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => {
            BackBtn();
          }}
        >
          ⇐Back
        </Button>
      </div>
    </>
  );
};

export default AddMovie;
