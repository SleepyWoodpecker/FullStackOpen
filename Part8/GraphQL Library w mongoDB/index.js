const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

// set up connection to MongoDB
const mongoose = require("mongoose");
require("dotenv").config();

// mongoose models
const Author = require("./models/authorModel");
const Book = require("./models/bookModel");
const User = require("./models/userModel");

// authentication
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Connected to MONGODB`))
  .catch((err) => console.log(`Error connecting to MONGODB`, err));
// genres: [String!]! means that you must return an array, and that every entry inside the array has to be a String. Value can be an empty array, no issue it seems

const typeDefs = `
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation {
    addBook (
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book

    editAuthor (
      name: String!,
      setBornTo: Int!
    ): Author

    addAuthor (
      name: String!,
      born: Int
    ): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Book {
    id: ID!
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
`;

// cannot use root.length for authors because it is defined under the query obj

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      if (!author && !genre) return Book.find({}).populate("author");

      if (author && !genre) {
        const desiredAuthor = await Author.findOne({ name: author });
        if (!desiredAuthor) throw new GraphQLError(`Author not found`);
        return Book.find({ author: desiredAuthor._id }).populate("author");
      }

      if (genre && !author) {
        return Book.find({ genres: { $elemMatch: { $eq: genre } } }).populate(
          "author"
        );
      }

      const desiredAuthor = await Author.findOne({ name: author });
      if (!desiredAuthor) throw new GraphQLError(`Author not found`);
      return Book.find({
        author: desiredAuthor._id,
        genres: { $elemMatch: { $eq: genre } },
      }).populate("author");
    },
    allAuthors: async () => {
      const [allBooks, allAuthors] = await Promise.all([
        Book.find({}),
        Author.find({}),
      ]);
      const bookCount = {};
      allBooks.forEach((book) => {
        if (bookCount[book.author]) {
          bookCount[book.author]++;
        } else {
          bookCount[book.author] = 1;
        }
      });
      allAuthors.forEach((author) => {
        author.bookCount = bookCount[author._id];
      });
      return allAuthors;
    },
    me: async (root, args, { user }) => user,
  },
  Mutation: {
    addBook: async (root, args, { user }) => {
      if (!user) {
        throw new GraphQLError(
          `You have to be logged in to perform this action`
        );
      }
      const { author, ...bookDetails } = args;
      let bookAuthor = await Author.findOne({ name: author });
      // add author into the DB if the author is not in the DB
      if (!bookAuthor) {
        bookAuthor = new Author({ name: author });
        try {
          await bookAuthor.save();
        } catch (err) {
          throw new GraphQLError(`Error saving new user`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              err,
            },
          });
        }
      }
      const newBook = new Book({
        ...bookDetails,
        author: bookAuthor._id.toString(),
      });

      try {
        await newBook.save();
      } catch (err) {
        throw new GraphQLError(`Error saving new book`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }

      const updatedBook = await newBook.populate("author");
      updatedBook.author.bookCount = await Book.find({
        author: bookAuthor._id,
      }).count();

      return updatedBook;
    },
    editAuthor: async (root, args, { user }) => {
      if (!user) {
        throw new GraphQLError(
          `You have to be logged in to perform this action`
        );
      }
      const { name, setBornTo } = args;
      let updatedAuthor;
      try {
        updatedAuthor = await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        );
      } catch (err) {
        throw new GraphQLError(`Error updating user`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }
      if (!updatedAuthor) throw new GraphQLError(`Author not found`);
      updatedAuthor.bookCount = await Book.find({
        author: updatedAuthor._id,
      }).count();
      return updatedAuthor;
    },
    addAuthor: async (root, args) => {
      const { name, born } = args;
      const newAuthor = new Author({ name, born });
      try {
        await newAuthor.save();
      } catch (err) {
        throw new GraphQLError(`Error saving new author`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }
      newAuthor.bookCount = 0;
      return newAuthor;
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args });
      try {
        await newUser.save();
      } catch (err) {
        throw new GraphQLError(`Error creating new user`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }

      return newUser;
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new GraphQLError(`We had trouble logging you in`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }
      return {
        value: jwt.sign({ username, id: user._id }, process.env.SECRET_KEY),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      // this is to decode the token
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.SECRET_KEY
      );
      const user = User.findById(decodedToken.id);
      return { user };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
