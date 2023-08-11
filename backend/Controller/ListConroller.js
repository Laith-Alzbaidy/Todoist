const List = require("../model/listModel"); // Import your List model

// Create a new list
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

// Get all lists
exports.getAllList = async (req, res) => {
  try {
    const list = await List.find();
    res.status(200).json({
      status: "success",
      data: list,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get a specific list by ID
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
      message: "Internal server error",
      error: err.message,
    });
  }
};
