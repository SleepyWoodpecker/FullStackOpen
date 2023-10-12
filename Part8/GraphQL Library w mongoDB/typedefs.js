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

type Subscription {
  bookAdded: Book!
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
  bookCount: Int
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

module.exports = typeDefs;
