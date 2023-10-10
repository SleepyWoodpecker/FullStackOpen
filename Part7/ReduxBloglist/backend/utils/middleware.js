const { info, error } = require("./logger");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requestLogger = (req, res, next) => {
  const method = req.method;
  const path = req.path;
  const body = JSON.stringify(req.body);
  info(`${method} ${path} ${body}`);
  next();
};

// define a middleware function to get the request token
const getJToken = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  if (authorizationHeader && authorizationHeader.startsWith("B")) {
    // remember to take out the space inside the header as well!
    req.token = authorizationHeader.replace("Bearer ", "");
  }

  next();
};

// based on the token returned, find out who the user is
const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  // check if there is error handling for an invalid token
  req.user = await User.findById(decodedToken.id);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "CastError") {
    return res.status(400).send("Malformatted ID");
  } else if (err.name === "ValidationError") {
    return res.status(400).json(err.message);
  }
  // account for errors when validating json token
  else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid Token" });
  }

  next(err);
};

module.exports = { requestLogger, getJToken, errorHandler, userExtractor };
