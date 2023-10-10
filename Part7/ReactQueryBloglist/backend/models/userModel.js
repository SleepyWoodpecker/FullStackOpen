const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // ref is used to refer to the path inside the DB that you wish to populate with
      ref: "Blog",
    },
  ],
  name: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (originalDoc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
    // passwordHash should not be shown
    delete returnedDoc.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
