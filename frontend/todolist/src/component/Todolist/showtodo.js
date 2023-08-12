import Todolist from "./todolist";
import AddList from "../AddList/addlist";
import { useContext, useState } from "react";
import { TodolistContext } from "../context";

function ShowTodo() {
  const { lists } = useContext(TodolistContext);

  return (
    <>
      <div className="body-section-todolist">
        {lists.map((list) => {
          return <Todolist key={list._id} list={list} />;
        })}
        <AddList />
      </div>
    </>
  );
}

export default ShowTodo;
