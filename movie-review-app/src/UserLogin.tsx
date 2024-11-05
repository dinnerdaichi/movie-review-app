import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    } catch (error) {
      console.error("ユーザーかパスが正しくありません:", error.response?.data || error.message);
    }

  }



  const handleBack = () => {
    navigate("/");
  };
  const handleRegister = () => {
    navigate("/register");
  };


  return (
    <>
      <div className="inner">
        <h1>LOGIN</h1>
        <div>
          <Stack spacing={2}>
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
          sx={{ mt: 2, width: "100%" }} // MUIで横幅maxを設定
          variant="contained"
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Button
          sx={{ mt: 4, width: "100%" }} // MUIで横幅maxを設定
          variant="contained"
          onClick={handleRegister}
        >
          SIGN UP
        </Button>
        <Button
          sx={{ mt: 2, width: "100%" }}
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