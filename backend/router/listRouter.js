const express = require("express");
const controller = require("../Controller/ListConroller");
const router = express.Router();

router.route("/").post(controller.createList).get(controller.getAllList);
router.route("/:id").get(controller.getSpecificList);

module.exports = router;
