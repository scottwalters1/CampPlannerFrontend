import React, { useState } from "react";
import { TextInput } from "./textInput.tsx";
import SubmitButton from "./submitBtn.tsx";
import "../css/login.css";
import { createUser } from "../api/users.ts";

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser({ username: email, password });
    console.log({ email, password });
  };

  return (
    <div className="login-form-container basic-container-bg">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <TextInput
          label="Username"
          value={email}
          onChange={setEmail}
          placeholder="Enter your username"
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
        />
        <TextInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm Password"
        />

        <SubmitButton label="Register" />
      </form>
      <div className="text-center mt-3">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
};
