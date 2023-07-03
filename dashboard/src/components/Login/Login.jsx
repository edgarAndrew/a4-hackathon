import React, { useState, useEffect } from "react";
import "./Login.css";
import { Typography, Button, Backdrop, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login} from "../../actions/user";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading,error,message} = useSelector((state)=>state.user)

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, error, alert, message]);

  if (loading)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  else
    return (
      <div className="login">
        <form className="loginForm" onSubmit={loginHandler}>
          <Typography
            variant="h3"
            style={{ padding: "2vmax", textAlign: "center" }}
          >
            Yolo Library
          </Typography>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot">
            <Typography>Forgot Password</Typography>
          </Link>
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
};

export default Login;
