const { Router } = require("express");
const router = Router();
const Task = require("../models/task.model");

router.get("/", (req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const newTask = new Task({
    username,
    description,
    duration,
  });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task Deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/update/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.username = req.body.username;
      task.description = req.body.description;
      task.duration = req.body.duration;

      task
        .save()
        .then(() => res.json("Task Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
