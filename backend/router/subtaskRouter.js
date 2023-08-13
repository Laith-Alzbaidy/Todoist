const express = require("express");
const controller = require("../Controller/SubtaskConroller");

const router = express.Router();

router.route("/").post(controller.createSubtask).get(controller.getAllSubtask);
router.route("/:id").get(controller.getSpecificSubTask);

// .delete(controller.deleteSubtask);

module.exports = router;
