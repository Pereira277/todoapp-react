import Taskitem from "../taskitem/Taskitem";
import React, { useState, useEffect } from "react";
import "./Tasklist.css";

function Tasklist(props) {
  // props array destructuring
  const [showTasks, setShowTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // props array destructuring
  const { setTasks, tasks, getTasksCall, logout, user } = props;

  // filter function
  function filterTasks() {
    let active = document.querySelector(".filter-active");
    let completed = document.querySelector(".filter-completed");
    let all = document.querySelector(".filter-all");

    if (filter === "Active") {
      setShowTasks(tasks.filter((item) => item.done === false));
      active.classList.add("selected");
      completed.classList.remove("selected");
      all.classList.remove("selected");
    } else if (filter === "Completed") {
      setShowTasks(tasks.filter((item) => item.done === true));
      completed.classList.add("selected");
      active.classList.remove("selected");
      all.classList.remove("selected");
    } else {
      setShowTasks(tasks);
      all.classList.add("selected");
      completed.classList.remove("selected");
      active.classList.remove("selected");
    }
  }

  function toggleOptions() {
    var optionsMenu = document.querySelector(".options");
    if (optionsMenu.classList.contains("options-active")) {
      optionsMenu.classList.remove("options-active");
    } else {
      optionsMenu.classList.add("options-active");
    }
  }

  //   useEffect
  useEffect(() => {
    filterTasks();
  }, [filter, tasks]);

  return (
    <div className="dashboard-container">
      <Taskitem
        tasks={tasks}
        setTasks={setTasks}
        filterTasks={filterTasks}
        showTasks={showTasks}
        getTasksCall={getTasksCall}
        logout={logout}
      />

      <div className="filters-container">
        <h3>Filters</h3>
        <div className="filters-btn-container">
          <button onClick={() => setFilter("All")} className="filter-all">
            All
          </button>
          <button onClick={() => setFilter("Active")} className="filter-active">
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className="filter-completed"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tasklist;