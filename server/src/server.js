const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers, controllers } = require("./controller");

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  const app = express();
  app.use(express.json());
  app.get("/user/:id", controllers.getUser);
  app.post("/user/:id", controllers.renameUser);

  server.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
