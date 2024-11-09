import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IMovie } from "./models/Movie";
import { Link } from "react-router-dom";

const MovieList: React.FC = ({username}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        setMovies(response.data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const sx = {
    height: "150px",
    objectfit: "cover",
  };

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {movies.map((movie: IMovie) => (
          <Grid
            size={3}
            key={movie._id}
          >
            <Card>
              <CardActionArea>
                <Link to={`/detail/${movie._id}`} state={{username:username}}>
                <p>{username}</p>
                  <CardMedia
                    component="img"
                    height="200"
                    image={movie.imageUrl}
                    sx={sx}
                  ></CardMedia>
                  <CardContent>
                   {/* <Typography variant="h5">{movie.title}</Typography> */}
                    <Typography variant="body1">{movie.rating}</Typography>
                    
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};


export default MovieList;