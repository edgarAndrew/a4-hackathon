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
import Addbook from "./components/Books/AddBook/Addbook";
import EditBook from "./components/Books/EditBook/EditBook";
import Students from "./components/Students/Students"
import AddStudent from "./components/Students/AddStudent/AddStudent";
import EditStudent from "./components/Students/EditStudent/EditStudent";
import Issue from "./components/Issue/Issue";
import Returns from "./components/Returns/Returns";
import Lendings from "./components/Lendings/Lendings";

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
            <Route path="/books/add" element={isAuthenticated ? <Addbook/> : <Login />}/>
            <Route path="/books/edit/:id" element={isAuthenticated ? <EditBook/> : <Login />}/>
            
            <Route path="/issue-book" element={isAuthenticated ? <Issue/> : <Login />}/>
            <Route path="/return-book" element={isAuthenticated ? <Returns/> : <Login />}/>
            
            <Route path="/students" element={isAuthenticated ? <Students/> : <Login />}/>
            <Route path="/students/add" element={isAuthenticated ? <AddStudent/> : <Login />}/>
            <Route path="/students/edit/:id" element={isAuthenticated ? <EditStudent/> : <Login />}/>
            
            <Route path="/lendings" element={isAuthenticated ? <Lendings/> : <Login />}/>

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
