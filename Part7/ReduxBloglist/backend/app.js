const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const { info, error } = require("./utils/logger");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongooseUrl = config.mongoUrl;

mongoose
  .connect(mongooseUrl)
  .then((result) => info(`Connected to MongoDB`))
  .catch((err) => error(`Error connecting to MongoDB`, err.message));

// app.use all the processing packages first
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.getJToken);

// by putting the userExtractor inside the BlogRouter, it ensures that the middleware is loaded only when the user makes a request to api/blogs
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
// later, app.use all the error handling packages
app.use(middleware.errorHandler);

module.exports = app;
