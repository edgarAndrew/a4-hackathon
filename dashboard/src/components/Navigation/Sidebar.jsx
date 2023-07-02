import React, { useState, useContext } from "react";
import {logout} from '../../actions/user'
import classes from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo/twist.png'
import {
  Home,
  HomeOutlined,
  Settings,
  SettingsOutlined,
  Close,
  Book,
  BookOutlined,
  VoiceChat,
  VoiceChatOutlined
} from "@mui/icons-material";
import { Typography, IconButton, Button } from "@mui/material";
import { MenuContext } from "react-flexible-sliding-menu";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { loading, isAuthenticated,profile } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [tab, setTab] = useState(window.location.pathname);
  const { toggleMenu } = useContext(MenuContext);
  
  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <div className={classes.sidebar}>
      <IconButton
        className={classes.close_btn}
        onClick={toggleMenu}
        aria-label="close sidebar menu"
      >
        <Close className={classes.close} />
      </IconButton>

      <div className={classes.menu}>
        {/* home */}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            setTab("/");
            toggleMenu();
          }}
        >
          {tab === "/" ? (
            <Home style={{ color: "#0008C1" }} />
          ) : (
            <HomeOutlined />
          )}
          <Typography variant="subtitle1">Home</Typography>
        </NavLink>

        {/* books */}
        <NavLink
          to="/books"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            setTab("/books");
            toggleMenu();
          }}
        >
          {tab === "/books" ? (
            <Settings style={{ color: "#0008C1" }} />
          ) : (
            <SettingsOutlined />
          )}
          <Typography variant="subtitle1">Books</Typography>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            setTab("/students");
            toggleMenu();
          }}
        >
          {tab === "/students" ? (
            <Book style={{ color: "#0008C1" }} />
          ) : (
            <BookOutlined />
          )}
          <Typography variant="subtitle1">Students</Typography>
        </NavLink>

        {isAuthenticated && (
          <Button component={NavLink} onClick={logoutHandler} to="/">
            logout
          </Button>
        )}
      </div>

      {/* logo */}
      <div className={classes.sidebar_logo}>
        <img
          className={classes.sidebar_logo_img}
          src={logo}
          alt="Twist Logo"
        />
      </div>
    </div>
  );
};

export default Sidebar;
