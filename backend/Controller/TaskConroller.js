const Task = require("../model/taskModel"); // Import your Task model

// Create a new Task
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

// Get all Tasks
exports.getAllTask = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get a specific Task by ID
exports.getSpecificTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get a specific Task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};
