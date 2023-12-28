const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Initialization
const app = express();
app.disable("x-powered-by");
require("./database");

// Settings
app.set("port", process.env.PORT || 4500);

// Middlewares (Core & Co.)
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

module.exports = app;
