const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    // required: [true, "description is required"],
  },
  subtaskId: { type: mongoose.Schema.Types.ObjectId, ref: "Subtask" },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  subtask: { type: String },
  completed: { type: Boolean, default: false },
  status: { type: String },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
