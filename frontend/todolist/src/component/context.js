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
  const [subtask, setSubtask] = useState([]);

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
    console.log(subtask);
    try {
      // Create the main task
      const taskResponse = await axios.post(
        `/api/v1/todoTask/${listId}/tasks`,
        task,
        listId
      );
      // Create the associated subtask
      if (subtask.length == 0) {
        console.log("the sub task is not found");
      } else {
        const subtaskResponse = await axios.post(`/api/v1/todoTask/subtask`, {
          taskId: taskResponse.data.task._id,
          subtask,
        });
      }
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

  //Update Task
  // api/v1/todotask/64da12abdcc94145ecb531d5
  const UpdateTask = async (taskId, newTitle) => {
    try {
      const task = await axios.patch(`/api/v1/todotask/${taskId}`, {
        title: newTitle,
      });

      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completedSubtask = async (subtaskId, completed) => {
    try {
      const response = await axios.patch(`/api/v1/subtask/${subtaskId}`, {
        completed: completed,
      });
      console.log("................", response.data.data);
      Getsubtask();
    } catch (err) {
      console.log(err);
    }
  };

  //Move the task another list

  // http://localhost:5000/api/v1/todotask/move/64daa73dc11b755c30f2eaf6

  const MoveTaskToAnotherList = async (taskId, listId) => {
    try {
      const response = await axios.put(`/api/v1/todotask/move/${taskId}`, {
        newListId: listId,
      });
      getTasks();
      console.log(taskId, listId);
    } catch (err) {
      console.log(err);
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
    UpdateTask,
    completedSubtask,
    MoveTaskToAnotherList,
  };

  return (
    // Provide the context data to consuming components
    <TodolistContext.Provider value={data}>
      {props.children}
    </TodolistContext.Provider>
  );
}

export default TodolistProvider;
