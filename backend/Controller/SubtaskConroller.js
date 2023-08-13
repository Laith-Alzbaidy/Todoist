const Subtask = require("../model/subtaskModel");
// exports.createSubTask = async (req, res) => {
//   try {
//     const subtask = await Subtask.create(req.body);
//     res.status(201).json({
//       status: "sucsess",
//       data: subtask,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "sucsess",
//       massage: err,
//     });
//   }
// };

// Get all lists
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

// Get a specific Task by ID
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
// ------------------------------------------------------------------

exports.createSubtask = async (req, res) => {
  const { taskId, subtaskTitle } = req.body;

  try {
    // Create the associated subtask
    const savedSubtask = await Subtask.create({
      title: subtaskTitle,
      taskId,
    });

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

exports.updateSubtask = async (req, res) => {
  try {
    const { subtaskId, completed } = req.body;
    // Find the subtask by ID
    const subtask = await Subtask.findById(subtaskId);

    // Update completion status
    subtask.completed = completed;

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

// exports.deleteSubtask = async (req, res) => {
//   try {
//     const subtask = await Subtask.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// };

// --------------------------------------
// exports.createSubtaskInTask = async (req, res) => {
//   try {
//     const taskId = req.params.id; // Assuming listId is passed in the URL parameter
//     const subtask = req.body;

//     // Create the task associated with the specific listId
//     const newsubtask = await Subtask.create({ ...subtask, taskId });

//     res.status(201).json({
//       status: "success",
//       data: newsubtask,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// };
