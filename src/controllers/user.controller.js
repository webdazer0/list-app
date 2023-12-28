const User = require("../models/user.model");

const getAll = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

const create = (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json({ message: "User added!" }))
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

const getById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

const deleteById = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "User Deleted!" }))
    .catch((err) => res.status(400).json({ message: "Error: " + err }));
};

module.exports = { getAll, create, getById, deleteById };
