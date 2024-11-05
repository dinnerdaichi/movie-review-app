import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegister: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/register", {
        username: username,
        password: password,
      });
      console.log("保存しました");
      BackBtn();
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
    }
  };

  const navigate = useNavigate();
  const BackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="inner">
        <h1>Let`s JOIN!!</h1>
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
          sx={{ mt: 2, mr: 2 }}
          variant="contained"
          onClick={(e) => handleRegister(e)}
        >
          USER CREATE
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

export default UserRegister;
