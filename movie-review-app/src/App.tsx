import "./App.css";
// import CreateMovieReview from "./CreateMovieReview";
import Front from "./Front";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Reviews } from "./interface/Reviews";
import { useEffect, useState } from "react";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import AddMovie from "./AddMovie";
import MovieDetail from "./MovieDetail";
import MovieEdit from "./MovieEdit";

function App() {
  const [reviews, setReviews] = useState<Reviews[]>([
]);

  // const addReview = (newReview: Reviews) => {
  //   setReviews([...reviews, newReview]);
  // };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await fetch('/api/reviews'); // 仮のエンドポイント
    const data = await response.json();
    setReviews(data);
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
          {/* <Route
            path="/create"
            element={<CreateMovieReview addReview={addReview} />}
          /> */}
          <Route  path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/detail/:movieId" element={<MovieDetail />} />
          <Route path="/movies/:movieId/edit" element={<MovieEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
