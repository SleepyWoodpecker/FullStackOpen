const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
});

mongoose.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
