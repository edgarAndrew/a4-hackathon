import "./App.css";
import { useEffect } from "react";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Navigation/Header";
import { Typography } from "@mui/material";
import { loadUser } from "./actions/user";
import Home from "./components/Home/Home";
import Books from "./components/Books/Books"
import Students from "./components/Students/Students"

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, []);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route element={isAuthenticated ? <Header/>:null}>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={isAuthenticated ? <Home/> : <Login />}/>
            <Route path="/books" element={isAuthenticated ? <Books/> : <Login />}/>
            <Route path="/students" element={isAuthenticated ? <Students/> : <Login />}/>
          </Route>
          <Route
            path="*"
            element={<Typography variant="h1">Opps! 404 Not Found!</Typography>}
          />
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

export default App;
