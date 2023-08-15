import "./DialogShowSubTask.css";
import { useState, useContext, useEffect } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Task from "../Todolist/task";
import EditTask from "../EditTask/EditTask";
// import ListOption from "../StatusDialog/StatusDialog";

import { TodolistContext } from "../context";

export default function FormDialog({ task, list }) {
  const {
    deleteTask,
    subtasks,
    completedSubtask,
    lists,
    MoveTaskToAnotherList,
  } = useContext(TodolistContext);

  // Filter subtasks based on taskId
  const filteredSubtasks = subtasks.filter(
    (subtask) => subtask?.taskId === task?._id
  );

  //// Filter completed subtasks
  const completed = filteredSubtasks.filter((ele) => {
    return ele.completed === true;
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="section-Dialog">
      <div className="continer-task-delete">
        {task && (
          <i
            onClick={() => {
              deleteTask(task._id);
            }}
            className="fa-solid fa-xmark icon-remove-dialog2"
          ></i>
        )}
        <div onClick={handleClickOpen}>
          <Task task={task} list={list} />
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent id="dialog" className="Containar">
          <div className="Header-dilaog-colomn">
            <EditTask task={task} />
            <i className="fa fa-ellipsis-v icon-dialog" aria-hidden="true"></i>
          </div>
          <p>{task?.description}</p>
          <form action="" className="form-dialog">
            <div className="lable-input-dialog">
              <label>{`subtasks (${completed.length}/3)`}</label>
            </div>
            {filteredSubtasks.map((subtask, index) => {
              return (
                <div className="lable-input-dialog lable-input" key={index}>
                  <label htmlFor={`checkbox${index}`}>
                    <input
                      type="checkbox"
                      id={`checkbox${index}`}
                      value={subtask.title}
                      checked={subtask.completed}
                      onChange={() => {
                        completedSubtask(
                          subtask._id,
                          !subtask.completed,
                          task._id
                        );
                      }}
                    />
                    {subtask.completed ? (
                      <del>{subtask.title}</del>
                    ) : (
                      subtask.title
                    )}
                  </label>
                </div>
              );
            })}

            <div className="lable-input-dialog">
              <label htmlFor="">Status</label>
              <select
                className="Select-option-dialog"
                onChange={(e) =>
                  MoveTaskToAnotherList(task._id, e.target.value)
                }
              >
                <option value="--">--</option>
                {lists.map((list) => (
                  <option key={list._id} value={list._id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <DialogContentText></DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
}
