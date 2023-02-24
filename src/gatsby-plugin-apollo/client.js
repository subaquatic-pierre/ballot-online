import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const getToken = () => {
  if (typeof window !== `undefined`) {
    return localStorage.getItem("token");
  }
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
    uri: `${process.env.GATSBY_API_URL}`,
    credentials: "include",
    headers: {
      Authorization: token ? `JWT ${token}` : "",
    },
    fetch,
  }),
});

export default client;
