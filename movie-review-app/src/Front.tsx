import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Reviews } from "./interface/Reviews";
import Header from "./component/Header";
import MovieList from "./MovieList";

interface FrontProps {
  reviews: Reviews[];
  // data: string;
}

const Front: React.FC<FrontProps> = () => {
  // const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const handleChildData = (data: string) => {
    setUsername(data);
  };

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

  const sx = {
    marginTop:"10px",
    marginLeft:"20px",
    backgroundColor: "#ffc100",
    borderRadius: "30px",
    boxShadow: "-4px 2px 0 0 var(--dark)",
    border: "5px solid black",
    fontFamily: "Bagel Fat One",
    color: "black",
    fontSize: "1.5rem",
    height:"80px",
    padding:"10px 30px",
    alignItems:"center",
  };

  return (
    <>
      <Header handleChildData={handleChildData} />
      <div className="front-container">
        <div className="front-flex">
          <h1 className="front-title">Find Your FAV!!</h1>
          <Button
            variant="contained"
            onClick={() => {
              handleclick();
            }}
            sx={sx}
            className="button-color"
          >
            ADD MOVIE🎥
          </Button>
        </div>

        <MovieList username={username} />
      </div>
    </>
  );
};

export default Front;
