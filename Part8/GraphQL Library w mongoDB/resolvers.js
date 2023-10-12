const { GraphQLError } = require("graphql");

// subscription
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

// mongoose models
const Author = require("./models/authorModel");
const Book = require("./models/bookModel");
const User = require("./models/userModel");

// authentication
const jwt = require("jsonwebtoken");

// cannot use root.length for authors because it is defined under the query obj

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      if (!author && !genre) {
        return Book.find({}).populate("author");
      }

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
      const allAuthors = await Author.find({}).populate("books");
      allAuthors.forEach((author) => {
        author.bookCount = author.books.length;
      });
      return allAuthors;
    },
    me: async (root, args, { user }) => user,
  },
  // Author: {
  //   bookCount: async (root) => {
  //     return Book.find({ author: root.id }).count();
  //   },
  // },
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
      bookAuthor.books = bookAuthor.books.concat(newBook._id);
      await bookAuthor.save();

      const updatedBook = await newBook.populate("author");
      updatedBook.author.bookCount = await Book.find({
        author: bookAuthor._id,
      }).count();

      // return the new added book to subscribers by sending out a notificaiton to all the subscribers
      pubsub.publish("BOOK_ADDED", { bookAdded: updatedBook });

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
  Subscription: {
    // by convention, iterator name is capitalised name of subscription
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
