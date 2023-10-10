require("dotenv").config();

// .env file always has to be in the main directory, not in a folder
// chooses the db to be accessing based on which environment you are using
const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const PORT = process.env.PORT || 3003;

module.exports = { mongoUrl, PORT };
