const List = require("../model/listModel");

exports.createList = async (req, res) => {
  try {
    const list = await List.create(req.body);

    res.status(201).json({
      status: "sucsess",
      data: list,
    });
  } catch (err) {
    res.status(404).json({
      status: "faild",
      massage: err,
    });
  }
};
