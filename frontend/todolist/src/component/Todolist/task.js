import React, { useContext } from "react"; // Don't forget to import React
import "./task.css";
import { TodolistContext } from "../context";

function Task({ task }) {
  return (
    <>
      {task && (
        <div className="task">
          <div className="header-task">
            <h3>{task.title}</h3>
          </div>
          <h6>{task.description}</h6>
          <div className="substasks"></div>

          <div>
            <span>0</span>
            <span>of</span>
            <span>3</span>
            <span>substasks</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
