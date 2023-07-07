import { Container, Typography, Box,Backdrop,CircularProgress } from "@mui/material";
import React from "react";
import HomeHeader from "./HomeHeader";
import HomeStats from "./HomeStats";
import { useDispatch, useSelector } from "react-redux";
import { getHomeStats } from "../../actions/home";

const Home = () => {
  const dispatch = useDispatch()
  const {profile,loading} = useSelector((state)=>state.user)
  
  React.useEffect(()=>{
    dispatch(getHomeStats())
  },[])

  return loading? (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <Container maxWidth="xl" sx={{minHeight: "calc(100vh - 64px)"}} className="home_container">
      <Typography component="h1" variant="h6" sx={{fontWeight: "bold", margin: "1rem 0"}}>
        Welcome {profile?.username}!
      </Typography>
      <HomeHeader />
      <HomeStats />
    </Container>
  );
};

export default Home;
