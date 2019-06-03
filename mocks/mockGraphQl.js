const  { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

// The GraphQL schema
const typeDefs = gql`
  type Post {
      id: Int
      title: String
      author: String
  }

  type Comment {
      id: Int
      body: String
      postId:Int
  }

  type Profile {
      name: String
  }

  type Query {
      profile: Profile
      comments: [Comment]
      posts: [Post]
  }
`;

const resolvers = {
  Query: {
    profile: () => (axios.get('http://localhost:3000/profile')
    .then(res => res.data)),
    comments: () => (axios.get('http://localhost:3000/comments')
    .then(res => res.data)),
    posts: () => (axios.get('http://localhost:3000/posts')
    .then(res => res.data)),  
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });