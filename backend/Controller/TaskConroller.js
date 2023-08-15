const Task = require("../model/taskModel"); // Import  Task model
const Subtask = require("../model/subtaskModel"); //Import  Subtask model
const List = require("../model/listModel"); // Import  List model

// -------Create a new Task--------------------------------------------------------------------------------------//
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// ------- Get all Tasks--------------------------------------------------------------------------------------//
exports.getAllTask = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// -------Get a specific Task by ID--------------------------------------------------------------------------------------//
exports.getSpecificTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// -------Delete a specific Task by ID--------------------------------------------------------------------------------------//
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(req.params.id);
    await Subtask.deleteMany({ taskId });
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// -------Create Task in List-------------------------------------------------------------------------------------------------------//
exports.createTaskInList = async (req, res) => {
  const { title, description } = req.body;
  const listId = req.params.id; // Extract title and description from the request body
  try {
    // Create the main task
    const newTask = await Task.create({
      title,
      description,
      listId,
    });

    // Set Task to inside List
    const updateTasks = await List.findById(listId);
    updateTasks.taskList.push(newTask._id);
    await updateTasks.save();

    res.status(201).json({
      task: newTask,
      // subtask: subtask,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      massage: err,
    });
  }
};

// -------Update Task-------------------------------------------------------------------------------------------------------//
exports.UpdateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "sucess",
      data: task,
    });
  } catch (err) {
    res.status(404).json({
      status: "feild",
      massage: err,
    });
  }
};

// -------move Task to another List-------------------------------------------------------------------------------------------------------//

exports.moveTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { newListId } = req.body;
  console.log("-------------", newListId);
  try {
    const task = await Task.findById(taskId);

    const listOrginalId = task.listId;
    // console.log("taskId", task._id);
    // console.log("newListId", newListId);
    // console.log("listOrginalId", listOrginalId);

    if (listOrginalId == newListId) {
      return res.status(400).json({
        status: "feild",
        massage: "the task is already in this list",
      });
    }

    const originalList = await List.findById(listOrginalId);
    const newList = await List.findById(newListId);

    // Remove the task from the original list
    originalList.taskList.pull(taskId);
    await originalList.save();

    // Remove the task from the original list
    newList.taskList.push(taskId);
    await newList.save();

    // Update the task's listId
    task.listId = newListId;
    await task.save();

    res.status(200).json({
      status: "sucsess",
      massage: "the move is done",
    });
    // console.log("-----originalList", originalList);
    // console.log("-----newList", newList);
  } catch (err) {
    res.status(404).json({
      status: "feild",
      massage: "the move task is not work ",
    });
  }
};
