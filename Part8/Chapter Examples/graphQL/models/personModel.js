const mongoose = require("mongoose");

// although graphql does the validation, should do it here as well, to keep validation in the DB
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
