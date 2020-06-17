import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import BaseRouter from './routes';
import Layout from './components/Layout';

// Get public IP from .env file
require('dotenv').config()
// const publicIP = process.env.REACT_APP_PUBLIC_IP

// get the authentication token from local storage if it exists
const getToken = () => {
  return localStorage.getItem('token');
}

const httpLink = createHttpLink({
  uri: `/graphql/`,
  credentials: 'include',
});

const authLink = setContext(({ headers }) => {
  const token = getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Authorization': token ? `JWT ${token}` : "",
    },
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Layout>
        <BaseRouter />
      </Layout>
    </Router>
  </ApolloProvider>
);

export default App;
