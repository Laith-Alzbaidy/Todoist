import { useState, useContext } from "react";
import { TodolistContext } from "../context";
import "./Edittask.css";
function EditTask({ task }) {
  const { UpdateTask } = useContext(TodolistContext);

  const [open, setOpen] = useState(false);
  const [newTitle, setEditTitle] = useState("");

  const handleChangeInput = (event) => {
    setEditTitle(event.target.value);
  };

  const EditTask = () => {
    console.log(newTitle);
    HandelClose();
    UpdateTask(task._id, newTitle);
    // newTitle && { HandelClose }
  };
  const HandelClose = () => {
    setOpen(false);
  };
  const HandelOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {open ? (
        <div className="task-title-edit">
          <input
            onChange={handleChangeInput}
            placeholder="Edit task title..."
            type="text"
            value={newTitle}
          />
          <i
            onClick={EditTask}
            class="fa fa-check done-edit"
            aria-hidden="true"
          ></i>
          <i onClick={HandelClose} class="fa-solid fa-xmark editFromDialog"></i>
        </div>
      ) : (
        <h3 onClick={HandelOpen} className="DialogTitle">
          {task?.title}
        </h3>
      )}
    </>
  );
}

export default EditTask;
