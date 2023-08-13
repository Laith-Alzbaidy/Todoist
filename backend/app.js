const express = require("express");
const morgan = require("morgan");
const routerList = require("./router/listRouter");
const routerTask = require("./router/taskRouter");
const routerSubtask = require("./router/subtaskRouter");
const app = express();

// to use req.body
app.use(express.json());

// Mounting Router
app.use("/api/v1/todolist", routerList);
app.use("/api/v1/todoTask", routerTask);
app.use("/api/v1/subtask", routerSubtask);

app.use(morgan("dev"));
//export to app beacous i need to run server in this Mounting
module.exports = app;
