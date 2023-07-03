import React, { useState, useContext } from "react";
import {logout} from '../../actions/user'
import classes from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo/twist.png'
import {
  Home,
  HomeOutlined,
  Close,
  LibraryBooks,
  LibraryBooksOutlined,
  Group,
  GroupOutlined,
  Summarize,
  SummarizeOutlined
} from "@mui/icons-material";
import { Typography, IconButton, Button } from "@mui/material";
import { MenuContext } from "react-flexible-sliding-menu";
import { useDispatch, useSelector } from "react-redux";
import { Forward, ForwardOutlined } from "@material-ui/icons";

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
            <LibraryBooks style={{ color: "#0008C1" }} />
          ) : (
            <LibraryBooksOutlined />
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
            <Group style={{ color: "#0008C1" }} />
          ) : (
            <GroupOutlined />
          )}
          <Typography variant="subtitle1">Students</Typography>
        </NavLink>
        

        <NavLink
          to="/issue-book"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            setTab("/issue-book");
            toggleMenu();
          }}
        >
          {tab === "/issue-book" ? (
            <Forward style={{ color: "#0008C1" }} />
          ) : (
            <ForwardOutlined />
          )}
          <Typography variant="subtitle1">Issue book</Typography>
        </NavLink>

        <NavLink
          to="/lendings"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          onClick={(e) => {
            setTab("/lending");
            toggleMenu();
          }}
        >
          {tab === "/lendings" ? (
            <Summarize style={{ color: "#0008C1" }} />
          ) : (
            <SummarizeOutlined />
          )}
          <Typography variant="subtitle1">Lendings</Typography>
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
