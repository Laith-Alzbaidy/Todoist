import { useState, useContext } from "react";
import "./CrateTaskdialog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TodolistContext } from "../context";

export default function FormDialog() {
  // State for controlling the dialog open/close
  const [open, setOpen] = useState(false);

  // Context for managing tasks and lists
  const { lists, createTask } = useContext(TodolistContext);

  // State for selected list ID and task details
  const [listId, setSelectedListId] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // Update task details when inputs change
  const GetTask = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Update selected list ID when dropdown selection changes
  const handleListSelect = (event) => {
    setSelectedListId(event.target.value);
    // setTask({ ...task, event.target.value });

    console.log("----------------", listId);
  };

  // Handle form submission
  const handleForm = (event) => {
    event.preventDefault();
    console.log(task);
    createTask(task, listId); // Pass both selectedListId and task
    handleClose();
  };

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="section-Dialog">
      <button className="btn-add-task" onClick={handleClickOpen}>
        +Add New Task
      </button>
      {/* Dialog component */}
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

            {/* Dropdown for selecting a list */}
            <div className="lable-input-dialog">
              <select
                className="Select-option-dialog"
                onChange={handleListSelect}
                value={listId}
              >
                <option value="--">--</option>
                {lists.map((list) => (
                  <option key={list._id} value={list._id} name={list.title}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Button to create the task */}
            <button className="btn-dialog btnCreateTask">Create Task</button>
          </form>
          <DialogContentText></DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
}
