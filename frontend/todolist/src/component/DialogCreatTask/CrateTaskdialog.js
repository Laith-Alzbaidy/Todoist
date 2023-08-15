import { useState, useContext, useEffect } from "react";
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
  const {
    lists,
    createTask,
    getIdlist,
    task,
    setTask,
    createSubTask,
    setSubtask,
    subtask,
  } = useContext(TodolistContext);

  //Create NEW SubTask

  const CreateNewSubtask = () => {
    if (subtask.length < 3) {
      const newSubTask = [...subtask, { title: "" }];
      setSubtask(newSubTask);
    } else {
      alert("you cant add more than 3 subtasks");
    }
  };

  const removeSubtask = (index) => {
    const newSubtasks = [...subtask];
    newSubtasks.splice(index, 1);
    setSubtask(newSubtasks);
  };

  // update subtask title if i change input

  const updateSubtasks = (index, newTitle) => {
    const newSubtasks = [...subtask];
    newSubtasks[index].title = newTitle;
    setSubtask(newSubtasks);
  };

  // State for selected list ID and task details
  // const GetSubtaskSolo = (event) => {
  //   setSubtask(event.target.value);
  // };

  // Update task details when inputs change
  const GetTask = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleForm = (event) => {
    event.preventDefault();
    handleClose();
    createTask(task); // Pass both selectedListId and task
    setTask("");
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
      <Dialog open={open}>
        <i
          className="fa-solid fa-xmark icon-remove-dialog close-dialog"
          onClick={handleClose}
        ></i>
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
                {subtask.map((subtask, index) => {
                  return (
                    <div className="input-subtask-remove">
                      <input
                        type="text"
                        placeholder="e.g. Make coffee"
                        onChange={(e) => updateSubtasks(index, e.target.value)}
                        name="title"
                      />
                      <i
                        onClick={() => removeSubtask(index)}
                        className="fa-solid fa-xmark icon-remove-dialog"
                      ></i>
                    </div>
                  );
                })}
                {/* <div className="input-subtask-remove">
                  <input
                    type="text"
                    placeholder="e.g. Make coffee"
                    onChange={(e) => GetSubtaskSolo(e)}
                    name="title"
                  />
                  <i className="fa-solid fa-xmark icon-remove-dialog"></i>
                </div> */}
              </div>
            </div>
            <Button onClick={CreateNewSubtask} className="btn-dialog">
              Add New Subtask
            </Button>

            {/* Dropdown for selecting a list */}
            <div className="lable-input-dialog">
              {
                <select
                  className="Select-option-dialog"
                  onChange={GetTask}
                  value={task.status}
                  name="status"
                  // onClick={GetTaskId}
                >
                  <option value="--">--</option>
                  {lists.map((list) => (
                    <option
                      onSelect={getIdlist(list._id)}
                      key={list._id}
                      value={list.title}
                    >
                      {list.title}
                    </option>
                  ))}
                </select>
              }
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
