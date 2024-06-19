// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://zesty-malabi-f16553.netlify.app/.functions/api', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

export default client;
