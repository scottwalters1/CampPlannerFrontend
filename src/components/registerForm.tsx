import React, { useState } from "react";
import "../css/login.css";
import { createUser } from "../api/users.ts";

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); //not actually used just here for decoration

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser({ username, password });
    console.log({ username, password });
  };

  return (
    <div className="login-form-container basic-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
