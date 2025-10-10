import React from "react";
import { RegisterForm } from "../components/login-registration/registerForm";
import "../css/login.css";

export const RegisterPage: React.FC = () => (
  <div className="login-page">
    <RegisterForm />
  </div>
);
