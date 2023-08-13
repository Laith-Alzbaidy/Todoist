import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TodolistContext = createContext();

function TodolistProvider(props) {
  // State to hold lists and tasks
  const [lists, setAllTitleList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [listId, setListCurrent] = useState("");
  const [subtasks, setSubTasks] = useState([]);
  // const [taskId, setTaskId] = useState("");
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

  // const createTask = async (task) => {
  //   console.log(listId);
  //   try {
  //     const response = await axios.post(`/api/v1/todoTask/${listId}/tasks`, {
  //       ...task,
  //       listId,
  //       // substask: subtask,
  //     });
  //     console.log("---------------", subtasks);
  //     setTasks([...tasks, response.data.data]);
  //   } catch (error) {
  //     console.log("Error creating task:", error);
  //   }
  // };

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

      console.log("Created Task:", taskResponse.data.task);
      console.log("Created Subtask:", subtaskResponse.data.subtask);

      // Update the tasks state with the new task
      setTasks([...tasks, taskResponse.data.task]);

      Getsubtask();
    } catch (error) {
      console.error("Error creating Task and Subtask:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Send the delete request
      await axios.delete(`/api/v1/todotask/${taskId}`);

      // await axios.delete(`/api/v1/subtask/${subtaskId}`);
      // updated tasks data and update the state
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);

      // console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getIdlist = (listId) => {
    const selectedList = lists.find(
      (list) => list._id === listId && list.title === task.status
    );
    if (selectedList) {
      // console.log(selectedList);
      setListCurrent(selectedList._id);
    }
  };

  // Get subtasks
  const Getsubtask = async () => {
    try {
      const response = await axios.get("/api/v1/subtask/");
      // console.log(response.data.data);
      setSubTasks(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  //create SubTask
  // const createSubTask = async () => {
  //   try {
  //     const response = await axios.post(
  //       `/api/v1/todotask/${taskId}/subtask`,
  //       subtask
  //     );
  //     console.log(response.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Context data that will be provided to consuming components
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
    // GetTaskId,
  };

  return (
    // Provide the context data to consuming components
    <TodolistContext.Provider value={data}>
      {props.children}
    </TodolistContext.Provider>
  );
}

export default TodolistProvider;
