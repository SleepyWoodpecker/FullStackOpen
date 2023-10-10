const loginRouter = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  // can just use findOne becuase based on the schema, each user is unique
  const user = await User.findOne({ username });

  // guess it seems like you can still access the password despite it having been deleted from the response
  const userAuthenticated =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !userAuthenticated) {
    // 401 occurs because of a lack of authorization
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const userObject = {
    username: user.username,
    id: user._id,
  };
  // first argument of jwt.sign can be an object, a string or a buffer
  const token = jwt.sign(userObject, process.env.SECRET);
  return res
    .status(200)
    .json({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
