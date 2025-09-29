import React from "react";
import { LoginForm } from "../components/loginForm"
import '../css/login.css'


export const LoginPage: React.FC = () => (
  <div className="login-page">
      <LoginForm />
  </div>
);