import React, { useState } from "react";
import "../../css/login.css";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errText, setErrText] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const message = await register(username, password);
        console.log(message);
        if (message) {
          navigate("/login");
        }
      } catch {
        setErrText("Username is taken!");
      }
    } else {
      console.error("Passwords don't match!");
      setErrText("Passwords don't match!");
    }
  };

  return (
    <div className="login-form-container basic-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <p style={{color:"red"}}>{errText}</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="form-control mt-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-control mt-3"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="form-control mt-3"
        />
        <button className="btn btn-primary">Register</button>
      </form>
      <div className="text-center mt-3">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
};
