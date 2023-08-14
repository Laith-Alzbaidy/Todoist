const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: { type: String },
  status: String,
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  completed: { type: Boolean, default: false },
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;
