const mongoose = require("mongoose");

const ListContentSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is required"] },
  taskList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  color: { type: String, default: generateRandomColor },
});

function generateRandomColor() {
  // Generate a random color code in hexadecimal format
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}

const List = mongoose.model("ListContent", ListContentSchema);

module.exports = List;
