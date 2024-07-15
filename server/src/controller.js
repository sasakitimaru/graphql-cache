const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Query {
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
  }

  type Mutation {
    renameUser(id: ID!, name: String!): User
  }
`;

const users = {
  1: { id: "1", name: "Alice" },
  2: { id: "2", name: "Bob" },
  3: { id: "3", name: "Charlie" },
};

const getUser = async (id) => {
  if (!users[Number(id)]) {
    throw new Error("User not found");
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  return users[Number(id)];
};

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await getUser(id);
    },
  },
  Mutation: {
    renameUser: async (_, { id, name }) => {
      const user = await getUser(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.name = name;
      return user;
    },
  },
};

const controllers = {
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
    res.json(user);
  },
  renameUser: async (req, res) => {
    const { id, name } = req.body;
    const user = await renameUser(null, { id, name });
    res.json(user);
  },
};

module.exports = { typeDefs, resolvers, controllers };
