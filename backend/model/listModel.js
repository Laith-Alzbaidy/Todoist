const mongoose = require("mongoose");

function generateRandomColor() {
  // Generate a random color code in hexadecimal format
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Changed to base 16
  return "#" + randomColor;
}

const ListContentSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is required"] },
  taskList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  color: { type: String, default: generateRandomColor }, // Use the function call
});

const List = mongoose.model("List", ListContentSchema);

module.exports = List;
