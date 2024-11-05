import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
  handleChildData: (data: string) => void;
}
export const Header: React.FC<HeaderProps> = ({handleChildData}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
          >
            Movie Review
          </Typography>

          {isLoggedIn ? (
            <>
              <Typography sx={{ mr: 2 }}>Hi👋 {username}さん</Typography>
              <Button
                variant="contained"
                onClick={handleLogout}
              >
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={goToSignup}
                sx={{mr:2}}
              >
                SIGN UP
              </Button>
              <Button
                variant="contained"
                onClick={goToLogin}
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
