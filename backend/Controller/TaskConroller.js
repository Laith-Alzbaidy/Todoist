const Task = require("../model/taskModel"); // Import your Task model
const Subtask = require("../model/subtaskModel");
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
    const taskId = req.params.id;
    await Task.findByIdAndDelete(req.params.id);
    await Subtask.deleteMany({ taskId });
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

// -----------------------------------------------------------
// Assuming you have imported the necessary models (Task and Subtask) properly

exports.createTaskInList = async (req, res) => {
  const { title, description } = req.body;
  const listId = req.params.id; // Extract title and description from the request body
  try {
    // Create the main task
    const task = await Task.create({
      title,
      description,
      listId,
    });

    // Create the associated subtask
    const subtask = await Subtask.create({
      taskId: task._id, // Link the subtask to the task
    });

    res.status(201).json({
      task: task,
      subtask: subtask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the task and subtask.",
    });
  }
};

// try {
//   const listId = req.params.id; // Assuming listId is passed in the URL parameter
//   const task = req.body;
//   const { substask } = req.body;

//   // Create the task associated with the specific listId
//   const createdTask = await Task.create({ ...task, listId });
//   const getSubttask = await Subtask.create(substask);

//   const subtask = getSubttask.map((subtask) => {
//     return subtask._id;
//   });
//   await Task.updateOne(
//     { _id: createdTask._id },
//     { $push: { subtaskId: subtask } }
//   );

//   res.status(201).json({
//     status: "success",
//     data: createdTask,
//   });
// } catch (err) {
//   res.status(400).json({
//     status: "failed",
//     message: err.message,
//   });
// }
