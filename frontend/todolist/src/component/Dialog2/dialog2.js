import "./dialog2.css";
import { useState, useContext } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Task from "../Todolist/task";
import { TodolistContext } from "../context";
export default function FormDialog({ task, list }) {
  const { deleteTask } = useContext(TodolistContext);

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
            <h3 className="DialogTitle">
              Research pricing points of various competitors and trial different
              business models
            </h3>
            <i className="fa fa-ellipsis-v icon-dialog" aria-hidden="true"></i>
          </div>
          <p>
            We know what we're planning to build for version one. Now we need to
            finalise the first pricing model we'll use. Keep iterating the
            subtasks until we have a coherent proposition.
          </p>
          <form action="" className="form-dialog">
            <div className="lable-input-dialog">
              <label>Subtasks(3 of 3)</label>
            </div>
            <div className="lable-input-dialog">
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
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
