const { Router } = require("express");
const router = Router();
const Users = require("../models/Users");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const { username } = req.body;
  const newUser = new Users({ username });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Errorxxxxxxx: " + err));
});

module.exports = router;
