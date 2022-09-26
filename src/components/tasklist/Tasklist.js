import Taskitem from "../taskitem/Taskitem";
import React, { useState, useEffect } from "react";

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

      {tasks.length < 0 && (
        <div className="filters-container">
          <div className="filters-buttons-container">
            <button onClick={() => setFilter("All")} className="filter-all">
              All
            </button>
            <button
              onClick={() => setFilter("Active")}
              className="filter-active"
            >
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
      )}
    </div>
  );
}

export default Tasklist;
