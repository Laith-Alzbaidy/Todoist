import "./todolist.css";
import Task from "./task";
import { TodolistContext } from "../context";
import { useContext, useEffect } from "react";
import Dialog2 from "../DialogShowSubTask/DialogShowSubTask";
import { green } from "@mui/material/colors";
function Todolist({ list }) {
  const { tasks } = useContext(TodolistContext);

  //Filter tasks related to the list
  const tasksForCurrentList = tasks.filter((task) => task.listId === list._id);
  return (
    <section className="continer-todolist">
      <div className="header-list">
        <span
          style={{ backgroundColor: `${list.color}` }}
          className="circle"
        ></span>
        <span>
          {list.title}
          {`(${tasksForCurrentList.length})`}
        </span>
        <i className="fa-solid fa-xmark icon-remove-dialog"></i>{" "}
      </div>

      <div className="content-list">
        {tasks
          .filter((task) => task.listId === list._id)
          .map((task) => {
            return <Dialog2 key={task._id} task={task} list={list} />;
          })}
      </div>
    </section>
  );
}

export default Todolist;
