import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Reviews } from "./interface/Reviews";
import Header from "./component/Header";
import MovieList from "./MovieList";

interface FrontProps {
  reviews: Reviews[];
  data: string
}

const Front: React.FC<FrontProps> = ({ reviews }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const handleChildData = (data) => {
    setUsername(data);
  }


  const navigate = useNavigate();
  // const handleclick = () => {
  //   const token = localStorage.getItem("token");

  //   if(token){
  //     navigate("/create");
  //   }else{
  //     navigate("/login");
  //   }
  // };

  const handleclick = () => {
    navigate("/add");
  };

  return (
    <>
      <Header handleChildData={handleChildData} />
      <div>
        <h1>Find Your Movie!!</h1>

        <Button
          variant="contained"
          onClick={() => {
            handleclick();
          }}
          sx={{ mb: 2 }}
        >
          ADD MOVIE
        </Button>

        <MovieList username={username} />
      </div>
    </>
  );
};

export default Front;
