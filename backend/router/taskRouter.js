const express = require("express");
const controller = require("../Controller/TaskConroller");
const router = express.Router();

router.route("/").post(controller.createTask).get(controller.getAllTask);
router
  .route("/:id")
  .get(controller.getSpecificTask)
  .delete(controller.deleteTask);

module.exports = router;
