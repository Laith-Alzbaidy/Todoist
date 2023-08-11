import React from "react"; // Don't forget to import React
import "./task.css";
import { TodolistContext } from "../context";

function Task({ task }) {
  return (
    task && (
      <div className="task">
        <h3>{task.title}</h3>
        <h6>{task.description}</h6>
        <div className="substasks">
          <div>
            <span>0</span>
            <span>of</span>
            <span>3</span>
            <span>substasks</span>
          </div>
        </div>
      </div>
    )
  );
}

export default Task;
