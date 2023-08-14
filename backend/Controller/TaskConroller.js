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
  const { title, description, subtask } = req.body;
  const listId = req.params.id; // Extract title and description from the request body
  try {
    // Create the main task
    const newTask = await Task.create({
      title,
      description,
      listId,
      subtask,
    });

    // Set Task to inside List
    const updateTasks = await List.findById(listId);
    updateTasks.taskList.push(newTask._id);
    updateTasks.save();

    res.status(201).json({
      task: newTask,
      subtask: subtask,
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
      massage: { err },
    });
  }
};
