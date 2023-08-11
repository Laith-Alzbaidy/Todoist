const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  subtask: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
  // list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
