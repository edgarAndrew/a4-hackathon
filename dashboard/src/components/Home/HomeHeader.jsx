import React from "react";
import classes from "./home.module.css";
import {
  Card,
  Typography,
  Box,
  CardContent,
  Avatar,
  Chip,
  Backdrop,
  CircularProgress
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { blueGrey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const HomeHeader = () => {
  const {loading,stats} = useSelector((state)=>state.home)
  
  return loading? (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  ) :  (
    <Box className={classes.head_cards}>
      {/* card 1 */}
      <Card className={classes.head_card} variant="blue-elevate">
        <CardContent>
          <Typography
            variant="subtitle1"
            className={classes.cardHeader}
            sx={{ color: blueGrey[200] }}
          >
            Total Students
          </Typography>
          <div className={classes.cardGrid}>
            <Typography paragraph variant="h3" className={classes.cardCount}>
              {stats?.no_of_students}
            </Typography>
            <Avatar
              sx={{ backgroundColor: "ocean.light", color: "primary.main" }}
              className={classes.cardIcon}
            >
              <VisibilityOutlinedIcon />
            </Avatar>
          </div>
        </CardContent>
      </Card>
      {/* card 2 */}
      <Card variant="blue-elevate" className={classes.head_card}>
        <CardContent>
          <Typography
            variant="subtitle1"
            className={classes.cardHeader}
            sx={{ color: blueGrey[200], fontWeight: 600 }}
          >
            Total Books
          </Typography>
          <div className={classes.cardGrid}>
            <Typography paragraph variant="h3" className={classes.cardCount}>
              {stats?.no_of_books}
            </Typography>
            <Avatar
              sx={{ backgroundColor: "ocean.light", color: "primary.main" }}
              className={classes.cardIcon}
            >
              <VisibilityOutlinedIcon />
            </Avatar>
          </div>
        </CardContent>
      </Card>
      {/* card 3 */}
      <Card variant="blue-elevate" className={classes.head_card}>
        <CardContent>
          <div className={classes.cardGrid}>
            <Typography
              variant="subtitle1"
              className={classes.cardHeader}
              sx={{ color: blueGrey[200], fontWeight: 600 }}
            >
              Books in Stock
            </Typography>
            {/* <Chip label="2 new" size="small" color="primary" /> */}
          </div>
          <div className={classes.cardGrid}>
            <Typography paragraph variant="h3" className={classes.cardCount}>
              {stats?.copies_in_stock}
            </Typography>
            <Avatar
              sx={{ backgroundColor: "ocean.light", color: "primary.main" }}
              className={classes.cardIcon}
            >
              <VisibilityOutlinedIcon />
            </Avatar>
          </div>
        </CardContent>
      </Card>
      {/* card 4 */}
      <Card variant="blue-elevate" className={classes.head_card}>
        <CardContent>
          <Typography
            variant="subtitle1"
            className={classes.cardHeader}
            sx={{ color: blueGrey[200], fontWeight: 600 }}
          >
            Total Borrows
          </Typography>
          <div className={classes.cardGrid}>
            <Typography paragraph variant="h3" className={classes.cardCount}>
              {stats?.total_issues}
            </Typography>
            <Avatar
              sx={{ backgroundColor: "ocean.light", color: "primary.main" }}
              className={classes.cardIcon}
            >
              <VisibilityOutlinedIcon />
            </Avatar>
          </div>
        </CardContent>
      </Card>

      <Card variant="blue-elevate" className={classes.head_card}>
        <CardContent>
          <Typography
            variant="subtitle1"
            className={classes.cardHeader}
            sx={{ color: blueGrey[200], fontWeight: 600 }}
          >
            Current Borrows
          </Typography>
          <div className={classes.cardGrid}>
            <Typography paragraph variant="h3" className={classes.cardCount}>
              {stats?.current_issues}
            </Typography>
            <Avatar
              sx={{ backgroundColor: "ocean.light", color: "primary.main" }}
              className={classes.cardIcon}
            >
              <VisibilityOutlinedIcon />
            </Avatar>
          </div>
        </CardContent>
      </Card>

      <Card variant="blue-elevate" className={classes.head_card}>
        <CardContent>
          <Typography
            variant="subtitle1"
            className={classes.cardHeader}
            sx={{ color: blueGrey[200], fontWeight: 600 }}
          >
            Pending Returns
          </Typography>
          <div className={classes.cardGrid}>
            <Typography paragraph variant="h3" className={classes.cardCount}>
              {stats?.pending_returns}
            </Typography>
            <Avatar
              sx={{ backgroundColor: "ocean.light", color: "primary.main" }}
              className={classes.cardIcon}
            >
              <VisibilityOutlinedIcon />
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomeHeader;
