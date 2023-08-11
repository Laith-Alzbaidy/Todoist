import "./todolist.css";
import Task from "./task";
import { TodolistContext } from "../context";
import { useContext, useEffect } from "react";
import Dialog2 from "../Dialog2/dialog2";
import { green } from "@mui/material/colors";
function Todolist({ list }) {
  const { tasks } = useContext(TodolistContext);

  return (
    <section className="continer-todolist">
      <div className="header-list">
        <span
          style={{ backgroundColor: `${list.color}` }}
          className="circle"
        ></span>
        <span>
          {list.title}
          {`(${list.length})`}
        </span>
        <i className="fa-solid fa-xmark icon-remove-dialog"></i>{" "}
      </div>
      <div className="content-list">
        {tasks.map((task) => {
          return <Dialog2 task={task} />;
        })}
      </div>
    </section>
  );
}

export default Todolist;
