import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./sidebar.module.css";
import { MenuContext } from "react-flexible-sliding-menu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { toggleMenu } = useContext(MenuContext);
  //const { loading, isAuthenticated } = useSelector((state) => state.user);

  const handleClick = () => {
    // setClicked((v) => !v)
    toggleMenu();
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{boxShadow: "none", borderBottom: "1px solid aliceblue", backgroundColor: "#2146C7", color: "#fff", zIndex: 20}} >
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yolo Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>

    <Outlet/>
    </>
  );
}

export default Header;
