import "./App.css";
import Nav from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import ShowToDo from "./component/Todolist/showtodo";
import { useContext, useState } from "react";
import TodolistProvider from "./component/context";
import Dialog2 from "./component/Dialog2/dialog2";
function App() {
  return (
    <div className="parent">
      <TodolistProvider>
        <Nav />
        <Sidebar />
        <ShowToDo />
        <Dialog2 />
      </TodolistProvider>
    </div>
  );
}
export default App;
