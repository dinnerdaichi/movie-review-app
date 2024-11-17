import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AxiosError } from "axios";


const UserLogin: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password,
      });

       console.log("レスポンス:",response.data);

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("ログインしました");
        navigate("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("ユーザーかパスが正しくありません:", error.response?.data || error.message);
      }
    }

  }



  const handleBack = () => {
    navigate("/");
  };
  const handleRegister = () => {
    navigate("/register");
  };

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


  return (
    <>
      <div className="inner login">
        <h1>LOGIN</h1>
        <div>
          <Stack spacing={2}
          sx={{mb:4}}
          >
            <TextField
              label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <TextField
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Stack>
        </div>
        <Button
          sx={{...sx,width:"49%",mr:1.5}} // MUIで横幅maxを設定
          variant="contained"
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Button
          sx={{...sx,width:"49%"}} // MUIで横幅maxを設定
          variant="contained"
          onClick={handleRegister}
        >
          SIGN UP
        </Button>
        <Button
          sx={{...sx,width:"100%"}}
          variant="contained"
          onClick={handleBack}
        >
          ⇐BACK TO HOME
        </Button>
      </div>
    </>
  );
};


export default UserLogin;