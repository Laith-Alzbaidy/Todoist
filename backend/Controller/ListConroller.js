const List = require("../model/listModel"); // Import your List model
const Task = require("../model/taskModel"); // Import your List model

// Create a new list
exports.createList = async (req, res) => {
  try {
    const list = await List.create(req.body);

    res.status(201).json({
      status: "success",
      data: list,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Get all lists
exports.getAllList = async (req, res) => {
  try {
    const lists = await List.find().populate("taskList"); // Populate the taskList field
    res.status(200).json({
      status: "success",
      data: lists,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get a specific list by ID
exports.getSpecificList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate("taskList"); // Populate the taskList field
    res.status(200).json({
      status: "success",
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.createTaskInList = async (req, res) => {
  try {
    const listId = req.params.id; // Assuming listId is passed in the URL parameter
    const task = req.body;

    // Create the task associated with the specific listId
    const createdTask = await Task.create({ ...task, listId });

    res.status(201).json({
      status: "success",
      data: createdTask,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
