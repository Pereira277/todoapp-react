import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState("");
  const navigate = useNavigate();

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
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <div className="login-main-container">
      <h1 className="login-title">TO DO</h1>
      <form onSubmit={createUser} className="login-form">
        <h3>Register</h3>
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

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
