require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => console.log(`MongoDB connected`))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`));

// custom validator for phone number
function checkPhoneNumber(phoneNumber) {
  const splitNumbers = phoneNumber.split("-");
  return (
    phoneNumber.length >= 8 &&
    (splitNumbers[0].length === 2 || splitNumbers[0].length === 3) &&
    splitNumbers.length === 2
  );
}

const phonebookEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  // creating a custom validator for phone numbers
  number: {
    type: String,
    validate: [checkPhoneNumber, { error: "Phone number format incorrect" }],
  },
});

// note that the transform should be altered in the options
phonebookEntrySchema.set("toJSON", {
  transform: (doc, returnDoc) => {
    returnDoc.id = returnDoc._id.toString();
    delete returnDoc._id;
    delete returnDoc.__v;
  },
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phonebookEntrySchema);

module.exports = PhonebookEntry;
