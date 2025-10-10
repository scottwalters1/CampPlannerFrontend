import React from "react";
import { LoginForm } from "../components/login-registration/loginForm"
import '../css/login.css'


export const LoginPage: React.FC = () => (
  <div className="login-page">
      <LoginForm />
  </div>
);