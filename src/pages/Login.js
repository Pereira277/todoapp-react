import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState("");
  const navigate = useNavigate();

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
    <div className="login-main-container">
      <h1 className="login-title">TO DO</h1>
      <form onSubmit={userLogin} className="login-form">
        <h3>Login</h3>
        <input
          placeholder="Username"
          maxLength="30"
          className="login-input username-login-input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          maxLength="30"
          className="login-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <p>
          Dont have a user?{" "}
          <a onClick={() => navigate("/Register")}>Click here</a>
        </p>

        <button
          type="submit"
          className="login-btn"
          onClick={() => setSubmit("login")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
