// imports to set up subscriptions
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

// type definitions and resolvers
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

// set up connection to MongoDB
const mongoose = require("mongoose");
require("dotenv").config();

// mongoose models
const User = require("./models/userModel");

// authentication
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Connected to MONGODB`))
  .catch((err) => console.log(`Error connecting to MONGODB`, err));

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // registers a websocket server object to listen to the websocket connection, besides usual HTTP connections
  // second part closes the web socket connection when the server shuts down
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
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
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });
};

start();
