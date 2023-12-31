const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  subtasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtask",
    },
  ],
  status: {
    type: String,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
