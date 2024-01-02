// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5001/', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

export default client;
