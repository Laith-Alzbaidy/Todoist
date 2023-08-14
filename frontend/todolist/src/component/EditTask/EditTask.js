import { useState } from "react";
import "./Edittask.css";
function EditTask({ task }) {
  const [open, setOpen] = useState(false);

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
          <input type="text" value={task.title} />
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
