import Todolist from "./todolist";
import AddList from "../AddList/addlist";
import { useContext, useState } from "react";
import { TodolistContext } from "../context";

function ShowTodo() {
  const { allTitleList } = useContext(TodolistContext);
  // Define a function to add a new title to the list
  return (
    <>
      <div className="body-section-todolist">
        {allTitleList.map((title) => {
          <AddList />;
          return <Todolist title={title} />;
        })}
        <AddList />
      </div>
    </>
  );
}

export default ShowTodo;
