import "./App.css";
import CreateMovieReview from "./CreateMovieReview";
import Front from "./Front";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Reviews } from "./interface/Reviews";
import { useState } from "react";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import AddMovie from "./AddMovie";
import MovieDetail from "./MovieDetail";

function App() {
  const [reviews, setReviews] = useState<Reviews[]>([
    {
      id: "1",
      title: "diehard",
      content: "hogehogehoge",
      image: "../src/assets/img/diehard.webp",
      rating: 4,
      userId: "123",
    },
    {
      id: "2",
      title: "spidermman",
      content: "mogemogemoge",
      image: "../src/assets/img/diehard.webp",
      rating: 3,
      userId: "124",
    },
    {
      id: "3",
      title: "fightClub",
      content: "mogemogemoge",
      image: "../src/assets/img/diehard.webp",
      rating: 3,
      userId: "124",
    },
    {
      id: "4",
      title: "inception",
      content: "mogemogemoge",
      image: "../src/assets/img/diehard.webp",
      rating: 3,
      userId: "124",
    },
  ]);

  const addReview = (newReview: Reviews) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Front
                reviews={reviews}

              />
            }
          />
          <Route
            path="/create"
            element={<CreateMovieReview addReview={addReview} />}
          />
          <Route  path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/detail/:movieId" element={<MovieDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
