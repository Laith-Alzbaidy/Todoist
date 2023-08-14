import "./DialogShowSubTask.css";
import { useState, useContext, useEffect } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Task from "../Todolist/task";
import EditTask from "../EditTask/EditTask";

import { TodolistContext } from "../context";

export default function FormDialog({ task, list }) {
  const { deleteTask, subtasks, completedSubtask } =
    useContext(TodolistContext);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      console.log("done");
      completedSubtask();
    }
  };

  // Filter subtasks based on taskId
  const filteredSubtasks = subtasks.filter(
    (subtask) => subtask?.taskId === task?._id
  );

  const completed = filteredSubtasks.filter((ele) => {
    return ele.completed === false;
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
                      // checked={subtask.completed}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                    {isChecked ? subtask.title : <del>{subtask.title}</del>}
                  </label>
                </div>
              );
            })}

            <div className="lable-input-dialog">
              <label htmlFor="">Status</label>
              <select className="Select-option-dialog" name="" id="">
                <option value="--">--</option>
                <option value="Todo">Todo</option>
                <option value="Done">Done</option>
                <option value="Doing">Doing</option>
              </select>
            </div>
          </form>
          <DialogContentText></DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
}
