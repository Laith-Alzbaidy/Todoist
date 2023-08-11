import "./todolist.css";
import Task from "./task";
import { TodolistContext } from "../context";
import { useContext } from "react";
import Dialog2 from "../Dialog2/dialog2";
function Todolist({ title }) {
  const { tasks } = useContext(TodolistContext);
  return (
    <section className="continer-todolist">
      <div className="header-list">
        <span className="circle"></span>
        <span>
          {title}
          {`(${tasks.length})`}
        </span>
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
