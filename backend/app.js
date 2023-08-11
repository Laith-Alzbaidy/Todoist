const express = require("express");
const morgan = require("morgan");
const routerTodo = require("./router/TodoRouter");
const app = express();

// to use req.body
app.use(express.json());

// Mounting Router
app.use("/api/v1/todolist", routerTodo);

app.use(morgan("dev"));
//export to app beacous i need to run server in this Mounting
module.exports = app;
