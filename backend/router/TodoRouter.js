const express = require("express");
const controller = require("../Controller/List");
const router = express.Router();

router.route("/").post(controller.createList);

module.exports = router;
