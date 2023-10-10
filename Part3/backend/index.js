const express = require("express");
let phoneBookData = require("./phoneBookData.js");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PhonebookEntry = require("./models/mongo.js");

// when deploying the app, routing to the build folders before routing to the MORGAN middleware will prevent the build folders from not throwing an error when requested
app.use(express.static("build"));
// this line actually activates the JSON parser
app.use(express.json());
// app.use(morgan("tiny"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(`:method :url :status :res[content-length] :response-time ms :body`)
);

// enable cross origin requests
app.use(cors());

app.get("/info", (req, res) => {
  console.log(phoneBookData, typeof phoneBookData);
  const unprocessedDate = new Date();
  const formattedDate = unprocessedDate.toString();
  const messageString = `Phonebook has information on ${phoneBookData.length} people`;
  const htmlResponse = `<div>
      <p>${messageString}</p>
      <br />
      <p>${formattedDate}</p>
    </div>`;
  res.send(htmlResponse);
});

app.get("/api/persons", (req, res) => {
  const phonebookData = PhonebookEntry.find({}).then((result) => {
    console.log(result);
    // when res.send is used, it is automatically formatted as a JSON object and sent back to the user, so there is no diff between res.send() and res.json() in this case
    res.status(200).send(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  // bruh ofc this ID has to be a string instead of number, it contains letters...
  const personId = String(req.params.id);
  const personEntry = PhonebookEntry.findById(personId)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).end();
      }
    })
    // in this case, the 400 error code is perfect: The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
    .catch((err) => {
      // it is also good practice to log your errors to the console
      console.log(err);
      res.status(400).send(`Format of your ID is wrong`);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const personId = req.params.id;
  PhonebookEntry.findByIdAndDelete(personId)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send(`no such person found`);
      }
    })
    .catch((err) => {
      next(err);
      res.status(500).end();
    });
});

// because of how my frontend is designed, the post request must always return the added obj
app.post("/api/persons", (req, res) => {
  // create a new entry by adding in person's name and phone number in the body of the request
  const { name, number } = req.body;
  // no need to check for duplicate names
  if (!name || !number) {
    res.status(500).send("Please add a value for name and number");
  }
  const newEntry = new PhonebookEntry({
    name,
    number,
  });

  // PhonebookEntry.exists({ name }),
  //   (err, foundDoc) => {
  //     // if an error is thrown, it means that the person does not yet exist?
  //     if (err) {
  //       console.log(`person does not exist`);
  //     } else if (foundDoc) {
  //       console.log(`person exists`);
  //     }
  //   };
  newEntry
    .save()
    .then((result) => {
      console.log(`Entry successfully saved`);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const personId = req.params.id;
  const { name, number } = req.body;
  const updatedEntry = {
    name,
    number,
  };
  // the context: query option helps run the validators through the entire new Entry, rather than just the updated fields
  PhonebookEntry.findByIdAndUpdate(personId, updatedEntry, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
      res.status(500).end();
    });
});

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(400).send("malformatted id").end();
  } else if (err.name === "ValidationError") {
    res.status(400).json(err.message);
  }
  console.log("Sheesh");
  next(err);
};

app.use(errorHandler);

// to add in functionality for deploying the website, use the following code:
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT}`));
