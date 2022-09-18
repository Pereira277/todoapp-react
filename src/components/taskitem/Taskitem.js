import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

function Taskitem(props) {
  // props array destructuring
  const { tasks, setTasks, filterTasks, showTasks, getTasksCall, logout } =
    props;

  // token auth
  async function refreshTokens(func, task) {
    let refreshToken = sessionStorage.getItem("refreshjwt");
    return axios
      .post("https://pereira277todoapi.herokuapp.com/user/token", {
        token: refreshToken,
      })
      .then((response) => {
        sessionStorage.setItem("jwt", response.data.accessToken);
        sessionStorage.setItem("refreshjwt", response.data.refreshToken);
      })
      .then(() => func(task))
      .catch((error) => {
        console.log(error.response.status);
        logout();
      });
  }

  // API call: Done
  async function taskDoneCall(task) {
    let done;
    let id = task._id;
    console.log(id);
    if (task.done === true) {
      done = false;
    } else {
      done = true;
    }
    await axios
      .put("https://pereira277todoapi.herokuapp.com/dashboard/", { id, done })
      .then((response) => {
        getTasksCall();
      })
      .catch(async function (error) {
        console.log("Executing refresh token");
        await refreshTokens(taskDoneCall, task);
      });
  }

  // API call: Delete
  async function taskDeleteCall(task) {
    await axios
      .delete(`https://pereira277todoapi.herokuapp.com/dashboard/${task._id}`)
      .then((response) => {
        getTasksCall();
      })
      .catch(async function (error) {
        console.log("Executing refresh token");
        await refreshTokens(taskDeleteCall, task);
      });
    getTasksCall();
  }

  // Clear done tasks
  async function clearCompleted() {
    let doneTasks = tasks.filter((item) => item.done === true);
    for (let i = 0; i < doneTasks.length; i++) {
      await taskDeleteCall(doneTasks[i]);
    }
  }

  return (
    <div className="tasklist-container">
      <ul>
        {showTasks.map((task) =>
          task.done == true ? (
            <li key={task._id} className="taskitem-container">
              <button
                onClick={() => taskDoneCall(task)}
                className="done-btn done-btn-done"
              >
                <FontAwesomeIcon icon={faCheck} className="check-icon show" />
              </button>
              <span className="taskitem-text taskitem-done">{task.name}</span>
              <button
                onClick={() => taskDeleteCall(task)}
                className="delete-btn delete-btn-done"
              >
                <FontAwesomeIcon icon={faXmark} className="xmark-icon" />
              </button>
            </li>
          ) : (
            <li key={task._id} className="taskitem-container">
              <button onClick={() => taskDoneCall(task)} className="done-btn">
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
              </button>
              <span className="taskitem-text">{task.name}</span>
              <button
                onClick={() => taskDeleteCall(task)}
                className="delete-btn"
              >
                <FontAwesomeIcon icon={faXmark} className="xmark-icon" />
              </button>
            </li>
          )
        )}
      </ul>

      {tasks.length < 1 ? (
        <div className="tasklist-buttons dont-show">
          <span>{`${
            tasks.filter((item) => item.done === false).length
          } items left`}</span>
          <button onClick={() => clearCompleted()} className="clear-completed">
            Clear Completed
          </button>
        </div>
      ) : (
        <div className="tasklist-buttons">
          <span>{`${
            tasks.filter((item) => item.done === false).length
          } items left`}</span>
          <button onClick={() => clearCompleted()} className="clear-completed">
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
}

export default Taskitem;
