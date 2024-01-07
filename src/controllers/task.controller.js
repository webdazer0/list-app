const Task = require('../models/task.model');

const getAll = (req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

const create = (req, res) => {
  const { username, description, tags = [], date } = req.body;
  const newTask = new Task({
    username,
    description,
    tags,
    date,
    done: false,
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
  const { username, description, tags = [], date, done } = req.body;
  Task.findById(req.params.id)
    .then((task) => {
      task.set({
        username,
        description,
        tags,
        date,
        done,
      });

      task
        .save()
        .then(() => res.json({ message: 'Task Updated!' }))
        .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
    })
    .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
};

//
// 🟠[x1] Update only fields ... with value. Ex. username: "Admin"
// const result = await Task.updateMany({ username: "Admin" }, { $set: { username: "Miguel" } });
// 🟠 Update all fields with value. Ex. username: "Miguel"
// const result = await Task.updateMany({}, { $set: { username: "Miguel" } });
// 🔴 Delete all fields. Ex. duration property
// const result = await Task.updateMany({}, { $unset: { duration: 1 } });
//
// const result = await Task.updateMany({}, { $set: { tags: ['Web Design'] } });
//
const customBatch = async (req, res) => {
  const date = new Date('2017-12-15');
  console.log(date);
  // custom batch
  try {
    const result = await Task.updateMany(
      { createdAt: '2023-12-27T23:46:12.976Z' },
      { $set: { date: date } }
    );
    console.log(result.modifiedCount);
    res.status(200).json({ message: 'SUCCESS UPDATE MANY' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL_ERROR' });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
  customBatch,
};
