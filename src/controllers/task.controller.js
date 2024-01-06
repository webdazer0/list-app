const Task = require('../models/task.model');

const getAll = (req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

const create = (req, res) => {
  const { username, description, tags = [] } = req.body;
  const newTask = new Task({
    username,
    description,
    tags,
  });

  newTask
    .save()
    .then(() => res.json({ message: 'Task added!' }))
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

const getById = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

const deleteById = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Task Deleted!' }))
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

const updateById = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.username = req.body.username;
      task.description = req.body.description;
      task.duration = req.body.duration;

      task
        .save()
        .then(() => res.json({ message: 'Task Updated!' }))
        .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
    })
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

const customBatch = async (req, res) => {
  // custom batch
  res.status(200).json({ message: 'SUCCESS UPDATE MANY' });
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
  customBatch,
};
