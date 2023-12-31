const express = require("express");
const controller = require("../Controller/TaskConroller");
const controllerSubTask = require("../Controller/SubtaskConroller");
const router = express.Router();

router.route("/").post(controller.createTask).get(controller.getAllTask);
router
  .route("/:id")
  .get(controller.getSpecificTask)
  .delete(controller.deleteTask)
  .patch(controller.UpdateTask);

router.route("/:id/tasks").post(controller.createTaskInList);
router.route("/subtask").post(controllerSubTask.createSubtask);
router.route("/move/:taskId").put(controller.moveTask);

module.exports = router;
