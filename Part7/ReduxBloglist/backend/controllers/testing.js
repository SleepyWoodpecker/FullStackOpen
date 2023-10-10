const testingRouter = require("express").Router();
const User = require("../models/userModel");
const Blog = require("../models/blogModel");
// setup this path to clear the testing DB
testingRouter.get("/", async (req, res) => {
  await Promise.all([User.deleteMany({}), Blog.deleteMany({})]);
  res.status(200).send("DB Cleared");
});

module.exports = testingRouter;
