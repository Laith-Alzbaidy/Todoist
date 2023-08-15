const List = require("../model/listModel"); // Import your List model
const Subtask = require("../model/subtaskModel");
const Task = require("../model/taskModel");

// ------- Create a new list-------------------------------------------------------------------------------------------------------//
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

// -------Get all lists-------------------------------------------------------------------------------------------------------//
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
      error: err.message,
    });
  }
};

// -------Get  Specific List by ID-------------------------------------------------------------------------------------------------------//
exports.getSpecificList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};
// -------Delete List-------------------------------------------------------------------------------------------------------//
exports.deleteList = async (req, res) => {
  try {
    const listId = req.params.id;

    console.log("-----------------", req.body);

    // Delete the list
    const list = await List.findByIdAndDelete(listId);

    // Delete tasks
    await Task.deleteMany({ listId: listId });

    // Find tasks to get their IDs and delete associated subtasks
    const tasks = await Task.find({ listId: listId });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};
