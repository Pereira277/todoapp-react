import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import userLogo from "../assets/user.png";
import keyLogo from "../assets/key.png";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    if (submit === "register") {
      createUser(e);
    } else {
      userLogin(e);
    }
  }

  function createUser(e) {
    e.preventDefault();
    console.log(name, password);

    axios
      .post("https://pereira277todoapi.herokuapp.com/user/create", {
        name,
        password,
      })
      .then((response) => {
        alert("User Created");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function userLogin(e) {
    e.preventDefault();

    axios
      .post("https://pereira277todoapi.herokuapp.com/user/login", {
        name,
        password,
      })
      .then((response) => {
        console.log(response.data);

        if ("accessToken" in response.data) {
          sessionStorage.setItem("jwt", response.data.accessToken);
          sessionStorage.setItem("refreshjwt", response.data.refreshToken);
          navigate("/dashboard");
        }
      });
  }
  return (
    <div>
      <h1 className="title">Todo</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-inputs user-input">
          <input
            placeholder="Username"
            maxLength="30"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="login-inputs password-input">
          <input
            type="password"
            placeholder="Password"
            maxLength="30"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <button
          type="submit"
          className="login-btn"
          onClick={() => setSubmit("login")}
        >
          Login
        </button>
        <p>or</p>
        <button
          type="submit"
          className="register-btn"
          onClick={() => setSubmit("register")}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
