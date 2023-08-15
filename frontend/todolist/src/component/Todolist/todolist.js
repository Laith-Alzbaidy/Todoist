import "./todolist.css";
import Task from "./task";
import { TodolistContext } from "../context";
import { useContext, useEffect } from "react";
import Dialog2 from "../DialogShowSubTask/DialogShowSubTask";
import { green } from "@mui/material/colors";
function Todolist({ list }) {
  const { tasks, DeleteList } = useContext(TodolistContext);

  //Filter tasks related to the list
  const tasksForCurrentList = tasks.filter((task) => task.listId === list._id);
  return (
    <section className="continer-todolist">
      <div className="header-list">
        <div>
          <span
            style={{ backgroundColor: `${list.color}` }}
            className="circle"
          ></span>
          <span>
            {list.title}
            {`(${tasksForCurrentList.length})`}
          </span>
        </div>
        <i
          onClick={() => {
            DeleteList(list._id);
          }}
          class="fa fa-trash"
          aria-hidden="true"
        ></i>{" "}
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
