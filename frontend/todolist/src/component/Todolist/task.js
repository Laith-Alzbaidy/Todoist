import { useContext } from "react";
import { TodolistContext } from "../context";

import "./task.css";
function Task({ task }) {
  // console.log("-------------------------------------------", task);
  const { completedSub, TaskID, subtasks } = useContext(TodolistContext);

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  );

  const filteredSubtasks = subtasks.filter(
    (subtask) => subtask?.taskId === task?._id
  );

  //// Filter completed subtasks
  const completed = filteredSubtasks.filter((ele) => {
    return ele.completed === true;
  });

  return (
    <>
      {task && (
        <div className="task">
          <div className="header-task">
            <h3>{task.title}</h3>
          </div>
          <h6>{task.description}</h6>
          <div className="substasks"></div>

          <div className="CountSubtask">
            <span>{completed.length}</span>
            <span>of</span>
            <span>{filteredSubtasks.length}</span>
            <span>substasks</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
