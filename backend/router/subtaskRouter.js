const express = require("express");
const controller = require("../Controller/SubtaskConroller");

const router = express.Router();

router.route("/").get(controller.getAllSubtask);
router
  .route("/:id")
  .get(controller.getSpecificSubTask)
  .patch(controller.updateSubtask);

module.exports = router;
