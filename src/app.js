const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

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
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
