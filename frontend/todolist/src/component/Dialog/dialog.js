import { useState, useContext } from "react";
import "./dialog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TodolistContext } from "../context";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const { addTask } = useContext(TodolistContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const GetTask = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleForm = (event) => {
    event.preventDefault();
    console.log(task);
    addTask(task);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  <button className="btn-add-task">+Add New Task</button>;

  return (
    <section className="section-Dialog">
      <button className="btn-add-task" onClick={handleClickOpen}>
        +Add New Task
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent id="dialog">
          <DialogTitle className="DialogTitle">Add New Task</DialogTitle>
          <form onSubmit={handleForm} action="" className="form-dialog">
            <div className="lable-input-dialog">
              <label>Title</label>
              <input
                onChange={(e) => {
                  GetTask(e);
                }}
                name="title"
                value={task.title}
                type="text"
                placeholder="e.g. Take coffe breack"
              />
            </div>
            <div className="lable-input-dialog">
              <label>Description</label>
              <input
                onChange={(e) => {
                  GetTask(e);
                }}
                name="description"
                value={task.description}
                type="text"
                placeholder="e.g. Take coffe breack Take coffe breack Take coffe breack Take coffe breack"
              />
            </div>
            <div className="lable-input-dialog">
              <label>Subtasks</label>
              <div className="Subtasks-dialog">
                <input type="text" placeholder="e.g. Make coffee" />
                <i className="fa-solid fa-xmark icon-remove-dialog"></i>
              </div>
              <div className="Subtasks-dialog">
                <input type="text" placeholder="e.g. Make coffee" />
                <i className="fa-solid fa-xmark icon-remove-dialog"></i>
              </div>
            </div>
            <Button className="btn-dialog">Add New Subtask</Button>

            <div className="lable-input-dialog">
              <select className="Select-option-dialog" name="" id="">
                <option value="--">--</option>
                <option value="Todo">Todo</option>
                <option value="Done">Done</option>
                <option value="Doing">Doing</option>
              </select>
            </div>
            <button className="btn-dialog btnCreateTask">Create Task</button>
          </form>
          <DialogContentText></DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
}
