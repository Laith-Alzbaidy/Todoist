import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TodolistContext = createContext();

function TodolistProvider(props) {
  // State to hold lists and tasks

  // Holds the list of all titles
  const [lists, setAllTitleList] = useState([]);

  // Holds the list of tasks
  const [tasks, setTasks] = useState([]);

  // Holds the currently selected list's ID
  const [listId, setListCurrent] = useState("");

  // Holds the list of subtasks
  const [subtasks, setSubTasks] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [subtask, setSubtask] = useState("");

  // Fetch lists and tasks when the component mounts
  useEffect(() => {
    getLists();
    getTasks();
    Getsubtask();
  }, []);

  //------- Start Fetch lists data from the API---------------------------------------------------------------------------------
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
  //Get Id List
  const getIdlist = (listId) => {
    const selectedList = lists.find(
      (list) => list._id === listId && list.title === task.status
    );
    if (selectedList) {
      setListCurrent(selectedList._id);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get("/api/v1/todotask");
      setTasks(response.data.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  //-----Start Fetch tasks data from the API-----------------------------------------------------------------------------------

  const createTask = async (task) => {
    console.log(tasks);
    try {
      // Create the main task
      const taskResponse = await axios.post(
        `/api/v1/todoTask/${listId}/tasks`,
        task,
        listId
      );

      // Create the associated subtask
      const subtaskResponse = await axios.post(`/api/v1/todoTask/subtask`, {
        taskId: taskResponse.data.task._id,
        subtaskTitle: subtask,
      });

      // Update the tasks state with the new task
      setTasks([...tasks, taskResponse.data.task]);

      getLists();
      Getsubtask();
    } catch (error) {
      console.error("Error creating Task and Subtask:", error);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      // Send the delete request
      await axios.delete(`/api/v1/todotask/${taskId}`);

      // updated tasks data and update the state
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  
  //-----Start Fetch subtask data from the API-----------------------------------------------------------------------------------
  // Get subtasks
  const Getsubtask = async () => {
    try {
      const response = await axios.get("/api/v1/subtask/");
      setSubTasks(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // To Share Data to consuming components
  const data = {
    lists,
    tasks,
    createList,
    createTask,
    getLists,
    deleteTask,
    getIdlist,
    setTask,
    task,
    subtasks,
    setSubtask,
    setSubTasks,
    subtask,
  };

  return (
    // Provide the context data to consuming components
    <TodolistContext.Provider value={data}>
      {props.children}
    </TodolistContext.Provider>
  );
}

export default TodolistProvider;
