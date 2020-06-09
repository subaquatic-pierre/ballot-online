import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import BaseRouter from './routes';
import Layout from './components/Layout';

const getToken = () => {
  return localStorage.getItem('token');
}

// const enchancedFetch = (url, init) => {
//   const token = getToken()
//   return fetch(url, {
//     ...init,
//     headers: {
//       ...init.headers,
//       'Access-Control-Allow-Origin': '*',
//       ...(token && { authorization: `Bearer ${token}` }),
//     },
//   }).then(response => response)
// }

require('dotenv').config()
const publicIP = process.env.REACT_APP_PUBLIC_IP
console.log(process.env)
console.log(publicIP)
let link = 'localhost'

if (publicIP) {
  link = publicIP
}

const httpLink = createHttpLink({
  uri: `http://${link}:8000/graphql/`,
  fetchOptions: {
    credentials: "omit",
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
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
