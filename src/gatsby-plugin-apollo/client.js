import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const getToken = () => {
  return localStorage.getItem("token");
};

// const httpLink = createHttpLink({
//   uri: `/graphql/`,
//   credentials: "include",
// });

// const authLink = setContext(({ headers }) => {

//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `JWT ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

const token = getToken();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `http://127.0.0.1:8000/graphql/`,
    credentials: "include",
    headers: {
      Authorization: token ? `JWT ${token}` : "",
    },
    fetch,
  }),
});

export default client;
