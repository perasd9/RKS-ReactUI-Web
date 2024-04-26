import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import loginPicture from "../../assets/login.jpg";
import LoginForm from "./LoginForm/LoginForm";

const LogIn = () => {
  return (
    <div className="main">
      <div className="main-image">
        <img src={loginPicture} alt="Slika" />
      </div>
      <LoginForm />
    </div>
  );
};

export default LogIn;
