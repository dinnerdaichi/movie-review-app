import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IMovie } from "./models/Movie";
import { Link } from "react-router-dom";

interface MovieListProps {
  username: string;
  // 他のプロパティがあればここに追加
}
const MovieList: React.FC<MovieListProps> = ({ username }) => {
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
        sx={{
          justifyContent: "center",
          mt: 2,
        }}
      >
        {movies.map((movie: IMovie) => (
          <Grid
            size={2}
            key={movie._id?.toString()}
            sx={{ pb: 0, maxWidth: "165px", minWidth: "165px" }}
          >
            <Card>
              <CardActionArea>
                <Link
                  to={`/detail/${movie._id}`}
                  state={{ username: username }}
                  className="movie-list__img"
                >
                  <CardMedia
                    component="img"
                    image={movie.imageUrl}
                    sx={{ ...sx, objectFit: "cover", height: "250px", backgroundPosition: "center" }}
                    alt={movie.title}
                  ></CardMedia>
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
