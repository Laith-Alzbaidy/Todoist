const express = require("express");
const controller = require("../Controller/TaskConroller");
const controllerSubTask = require("../Controller/SubtaskConroller");
const router = express.Router();

router.route("/").post(controller.createTask).get(controller.getAllTask);
router
  .route("/:id")
  .get(controller.getSpecificTask)
  .delete(controller.deleteTask);

router.route("/:id/tasks").post(controller.createTaskInList);
router.route("/subtask").post(controllerSubTask.createSubtask);

module.exports = router;
