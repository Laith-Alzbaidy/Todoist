const Subtask = require("../model/subtaskModel");
const Task = require("../model/taskModel");
// ---- Get all lists-----------------------------------------------------------------------------------------------------------//
exports.getAllSubtask = async (req, res) => {
  try {
    const subtask = await Subtask.find();
    // const subtask = await Subtask.find().populate("taskId"); // Populate the taskList field
    res.status(200).json({
      status: "success",
      data: subtask,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ----Get a specific Task by ID-----------------------------------------------------------------------------------------------------------//

exports.getSpecificSubTask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: subtask,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};
// ----create Subtask-----------------------------------------------------------------------------------------------------------//

exports.createSubtask = async (req, res) => {
  console.log(req.body);
  const { taskId, subtask } = req.body;

  console.log("------------", subtask);
  const subtasks = subtask.map((ele) => {
    ele.taskId = taskId;
    return ele;
  });

  console.log("***************", subtasks);
  try {
    // Create the associated subtask
    const savedSubtask = await Subtask.create(subtasks);

    const task = await Task.findById(taskId);
    task.subtasks.push(savedSubtask._id);
    task.save();

    res.status(201).json({
      subtask: savedSubtask,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the subtask." });
  }
};

// -------update subtask-------------------------------------------------------------------------------------------------------//

exports.updateSubtask = async (req, res) => {
  try {
    const subtaskId = req.params.id;

    console.log(subtaskId);
    console.log("...", req.body);
    // Find the subtask by ID
    const subtask = await Subtask.findByIdAndUpdate(subtaskId, req.body, {
      new: true,
    });
    // Update completion status

    res.status(200).json({
      status: "subtask updaate sucsess",
      data: subtask,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
