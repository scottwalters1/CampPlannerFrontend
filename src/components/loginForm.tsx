import React, { useState } from "react";
import { TextInput } from "./textInput.tsx";
import SubmitButton from "./submitBtn.tsx";
import "../css/login.css";
import { login } from "../api/users.ts";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({username, password});
  };

  return (
    <div className="login-form-container basic-container-bg">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <TextInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
        />

        <SubmitButton label="Sign In" />
      </form>
      <div className="text-center mt-3">
        Not a user? <a href="/register">Register here.</a>
      </div>
    </div>
  );
};
