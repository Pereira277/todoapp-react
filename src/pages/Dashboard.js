import React, { useState, useEffect, useRef } from "react";
import Input from "../components/input/Input";
import Tasklist from "../components/tasklist/Tasklist";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

function Dashboard() {
  const isMounted = useRef(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  // Coloca token JWT no header das requests
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${sessionStorage.getItem("jwt")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // fecth from API
  useEffect(() => {
    if (sessionStorage.getItem("jwt") === null) {
      logout();
    } else {
      getTasksCall();
      getUser();
    }
  }, []);

  // GET
  function getTasksCall() {
    axios
      .get("https://pereira277todoapi.herokuapp.com/dashboard/")
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(async function (error) {
        console.log("Executing refresh token GETTASKS");
        await refreshTokens(getTasksCall);
      });
  }

  // Get current logged user
  function getUser() {
    axios
      .get("https://pereira277todoapi.herokuapp.com/dashboard/user")
      .then((response) => {
        console.log(`User ${response.data} logged in`);
        setUser(response.data);
      })
      .catch(async function (error) {
        console.log("Executing refresh token GETUSER");
        await refreshTokens(getUser);
      });
  }

  // refresh Token
  async function refreshTokens(func) {
    let refreshToken = sessionStorage.getItem("refreshjwt");
    return axios
      .post("https://pereira277todoapi.herokuapp.com/user/token", {
        token: refreshToken,
      })
      .then((response) => {
        sessionStorage.setItem("jwt", response.data.accessToken);
        sessionStorage.setItem("refreshjwt", response.data.refreshToken);
      })
      .then(() => func())
      .catch((error) => {
        console.log(error.response.status);
        logout();
      });
  }

  function logout() {
    // AXIOS CALL TO REMOVE REFRESH TOKEN
    let refreshToken = sessionStorage.getItem("refreshjwt");
    axios.post("https://pereira277todoapi.herokuapp.com/user/deletetoken", {
      token: refreshToken,
    });
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("refreshjwt");
    navigate("/");
  }

  return (
    <div className="App">
      <h1 className="title">TO DO</h1>
      <div className="main-container">
        <Input getTasksCall={getTasksCall} logout={logout} />
        <Tasklist
          setTasks={setTasks}
          tasks={tasks}
          getTasksCall={getTasksCall}
          logout={logout}
          user={user}
        />
      </div>
    </div>
  );
}

export default Dashboard;
