import React, { useContext, useState } from "react";
import { TodolistContext } from "../context";
import { Bar } from "react-chartjs-2";
import "./chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { lists } = useContext(TodolistContext);

  const listLabels = lists.map((list) => list.title);
  const listColors = lists.map((list) => list.color);
  const taskCount = lists.map((list) => list.taskList.length);

  const data = {
    labels: listLabels,
    datasets: [
      {
        label: "Dataset 2",
        backgroundColor: listColors,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: taskCount,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "To-Do List Horizontal Bar Chart",
        color: "white", // Set the font color to white
        fontSize: "20px",
      },
    },
  };

  return (
    <div className="Chart-Container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
