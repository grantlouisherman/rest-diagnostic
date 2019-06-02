const  { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

// The GraphQL schema
const typeDefs = gql`
  type Post {
      id: Int
      title: String
      author: String
  }
  type Posts {
    posts: [Post]
  }
  type Comment {
      id: Int
      body: String
      postId:Int
  }
  type Comments {
      comments: [Comment]
  }
  type Profile {
      name: String
  }

  type Query {
      profile: Profile
      comments: Comments
      posts: Posts
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    profile: () => (axios.get('http://localhost:3000/profile')
    .then(res => res)),
    comments: () => (axios.get('http://localhost:3000/comments')
    .then(res => res)),
    posts: () => (axios.get('http://localhost:3000/posts')
    .then(res => res)),  
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });