import "./App.css";
import Nav from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import ShowToDo from "./component/Todolist/showtodo";
import { useContext, useState } from "react";
import Dialog2 from "./component/DialogShowSubTask/DialogShowSubTask";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BarChart from "./component/Charts/chart";

function App() {
  return (
    <div className="parent">
      <BrowserRouter>
        <Nav />
        <Routes>
          {<Route path="/chart" element={<BarChart />} />}
          {<Route path="/" element={<ShowToDo />} />}
          {<Route path="/" element={<Dialog2 />} />}
        </Routes>
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}
export default App;
