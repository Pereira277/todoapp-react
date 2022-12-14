import React, { useState } from "react";
import axios from "axios";

export default function Input(props) {
  const [name, setName] = useState("");
  const done = false;

  // props array destructuring
  const { getTasksCall, logout } = props;

  //Refresh token
  async function refreshTokens(e) {
    let refreshToken = sessionStorage.getItem("refreshjwt");
    return axios
      .post("http://54.233.95.79:3333/user/token", {
        token: refreshToken,
      })
      .then((response) => {
        sessionStorage.setItem("jwt", response.data.accessToken);
        sessionStorage.setItem("refreshjwt", response.data.refreshToken);
      })
      .then(() => createTask(e))
      .catch((error) => {
        console.log(error.response.status);
        logout();
      });
  }

  // NEW POST TASKS
  const createTask = (e) => {
    e.preventDefault();
    console.log(name);
    axios
      .post("http://54.233.95.79:3333/dashboard/", {
        name,
        done,
        createdby: "",
      })
      .then((response) => {
        setName("");
        getTasksCall();
      })
      .catch(async function (error) {
        console.log("Executing refresh token");
        await refreshTokens(e);
      });
  };

  return (
    <div className="input-container">
      <form onSubmit={createTask}>
        <input
          placeholder="Create a new todo"
          maxLength="50"
          className="add-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </form>
    </div>
  );
}
