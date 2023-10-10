const User = require("../models/userModel");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const userList = await User.find({}).populate("blogs");
  res.status(200).send(userList);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  // password must be at least 3 characters long
  if (password.length < 3) {
    return res
      .status(400)
      .send(`Password should at least be 3 characters long`);
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ username, name, passwordHash });
  const savedUser = await newUser.save();
  res.status(201).send(savedUser);
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const desiredUser = await User.findById(id).populate("blogs");
  res.status(200).send(desiredUser);
});

module.exports = userRouter;
