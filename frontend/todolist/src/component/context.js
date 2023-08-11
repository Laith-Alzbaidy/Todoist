import { createContext, useState, useEffect } from "react";
// import axios from "axios";
export const TodolistContext = createContext();

function TodolistProvider(props) {
  const [allTitleList, AllsetTitleList] = useState([]);
  const [tasks, setTask] = useState([]);
  // const [database, setdatabase] = useState([]);
  const addTitleList = (title) => {
    AllsetTitleList([...allTitleList, title]);
  };

  const addTask = (newTask) => {
    setTask([...tasks, newTask]);
  };

  //get title list
  // const GetTask = async () => {
  //   try {
  //     const respons = await axios.get("/api/v1/todolist");
  //     console.log("reapost", respons);
  //   } catch (err) {
  //     console.log("err");
  //   }
  // };
  // get list database

  const data = {
    allTitleList,
    addTitleList,
    addTask,
    tasks,
  };
  return (
    <TodolistContext.Provider value={data}>
      {props.children}
    </TodolistContext.Provider>
  );
}
export default TodolistProvider;
