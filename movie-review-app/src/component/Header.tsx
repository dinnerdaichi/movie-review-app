import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  handleChildData: (data: string) => void;
}
export const Header: React.FC<HeaderProps> = ({ handleChildData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getUserInfo(token);
    }
  }, []);

  const getUserInfo = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3000/api/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Info Response:", response.data); // ここ
      setUsername(response.data.username);
      handleChildData(response.data.username);
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
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

  const sx2 = {
    backgroundColor: "#0080cc",
    borderRadius: "25px",
    boxShadow: "-4px 2px 0 0 var(--dark)",
    padding: " 10px 30px",
    border: "5px solid black",
    fontFamily: "Kiwi Maru",
    color: "#ffc100",
    fontSize: "2rem",
    mb: 0,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ ...sx }}
      >
        <Toolbar className="box-color">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            flexGrow={1}
            component="div"
            align="left"
            fontFamily="Bagel Fat One"
            fontSize="2rem"
          >
            Movie ReviewApp
          </Typography>

          {isLoggedIn ? (
            <>
              <Typography
                sx={{
                  mr: 2,
                  fontFamily: "Bagel Fat One",
                  fontSize: "2rem",
                }}
              >
                Hi👋 {username}
              </Typography>
              <Button
                sx={{ ...sx2, fontSize: "1rem", fontFamily: "Bagel Fat One", mb: 0 }}
                variant="contained"
                onClick={handleLogout}
              >
                logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={goToSignup}
                sx={{ ...sx2, mr: 2, fontSize: "1rem", fontFamily: "Bagel Fat One" }}
              >
                SIGN UP
              </Button>
              <Button
                variant="contained"
                onClick={goToLogin}
                sx={{ ...sx2, fontSize: "1rem", fontFamily: "Bagel Fat One" }}
              >
                LOGIN
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
