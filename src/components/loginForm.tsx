import React, { useState } from "react";
import "../css/login.css";
import { login } from "../api/users.ts";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="login-form-container basic-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        Not a user? <a href="/register">Register here.</a>
      </div>
    </div>
  );
};
