import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TodolistContext = createContext();

function TodolistProvider(props) {
  // State to hold lists and tasks
  const [lists, setAllTitleList] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch lists and tasks when the component mounts
  useEffect(() => {
    getLists();
    getTasks();
  }, []);

  // Fetch lists data from the API
  const getLists = async () => {
    try {
      const response = await axios.get("/api/v1/todolist");
      setAllTitleList(response.data.data);
    } catch (error) {
      console.log("Error fetching lists:", error);
    }
  };

  // Create a new list
  const createList = async (title) => {
    try {
      const response = await axios.post("/api/v1/todolist", { title });
      setAllTitleList([...lists, response.data.data]);
    } catch (error) {
      console.log("Error creating list:", error);
    }
  };

  // Fetch tasks data from the API
  const getTasks = async () => {
    try {
      const response = await axios.get("/api/v1/todotask");
      setTasks(response.data.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // Create a new task
  const createTask = async (task, listId) => {
    try {
      const response = await axios.post(`api/v1/todolist/${listId}/tasks`, {
        ...task,
        listId,
      });
      setTasks([...tasks, response.data.data]);
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Send the delete request
      await axios.delete(`/api/v1/todotask/${taskId}`);

      // updated tasks data and update the state
      const updateTask = tasks.filter((task) => task._id !== taskId);
      setTasks(updateTask);

      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Context data that will be provided to consuming components
  const data = {
    lists,
    tasks,
    createList,
    createTask,
    getLists,
    deleteTask,
  };

  return (
    // Provide the context data to consuming components
    <TodolistContext.Provider value={data}>
      {props.children}
    </TodolistContext.Provider>
  );
}

export default TodolistProvider;
