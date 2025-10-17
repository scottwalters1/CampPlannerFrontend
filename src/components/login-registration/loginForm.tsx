import React, { useState } from "react";
import "../../css/login.css";
import { useAuth } from "../../context/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errTxt, setErrTxt] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      if (user) {
        navigate("/");
      }
    } catch(err) {
      console.log(err);
      setErrTxt("Invalid Username or Password");
    }
  };

  return (
    <div className="login-form-container basic-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p style={{color:"red"}}>{errTxt}</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="form-control mt-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-control mt-3"
        />

        <button className="btn btn-primary">Login</button>
      </form>
      <div className="text-center mt-3">
        Not a user? <Link to="/register">Register here.</Link>
      </div>
    </div>
  );
};
