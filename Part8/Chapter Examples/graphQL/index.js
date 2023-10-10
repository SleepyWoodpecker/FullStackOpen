const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Person = require("./models/personModel");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Successfully connected to MONGODB`))
  .catch((err) => console.log(`Error connecting to MONGODB`, err));

const typeDefs = `
  type Address {
    street: String!,
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!,
      phone: String,
      street: String!,
      city: String!
    ): Person

    editNumber(
      name: String!,
      phone: String!
    ): Person
  }

  enum YesNo {
    YES
    NO
  }
`;

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }

      // return persons.filter((person) =>
      //   args.phone === "YES" ? person.phone : !person.phone

      // this is one of those mongoDB keywords that as described, filter the entries based on whether the phone exists
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Person: {
    address: (root) => ({ street: root.street, city: root.city }),
  },
  Mutation: {
    addPerson: async (root, args) => {
      // check that each person's name is unique, else send an error message
      // if (persons.find((person) => person.name === args.name)) {
      //   throw new GraphQLError("Name must be unique", {
      //     extensions: {
      //       code: "BAD_USER_INPUT",
      //       invalidArgs: args.name,
      //     },
      //   });
      // }

      const newPerson = new Person({ ...args });
      try {
        newPerson.save();
      } catch (err) {
        throw new GraphQLError("Error saving new person", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            err,
          },
        });
      }
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        person.save();
      } catch (err) {
        throw new GraphQLError(`Error saving phone number`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            err,
          },
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
