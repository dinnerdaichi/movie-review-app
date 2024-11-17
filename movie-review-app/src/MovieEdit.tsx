// import { Button, Stack, TextField } from "@mui/material";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieEdit: React.FC = () => {

  const { movieId } = useParams();
const [title, setTitle] = useState("");
const [imageUrl, setImageUrl] = useState("");
const navigate = useNavigate()

useEffect(() => {
  const fetchMovie = async () => {
    try{
      const response = await axios.get(`http://localhost:3000/api/movies/${movieId}`);
      setTitle(response.data.title);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  }
  fetchMovie();
}, [movieId]);

const handleSave = async () => {
  try{
    await axios.put(`http://localhost:3000/api/movies/${movieId}/edit`, { title, imageUrl });
    navigate("/");
  } catch (error) {
    console.error(error);
  }
}







  return (

      <>
        <h1>Movie Edit</h1>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      </>

  );
}

export default MovieEdit;