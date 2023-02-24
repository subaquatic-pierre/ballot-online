module.exports = {
  siteMetadata: {
    title: "Ballot Online",
    siteUrl: "https://ballot-online.zeroisone.io",
    description: "The best ballot voting website",
  },

  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "http://127.0.0.1:8000/graphql",
      },
    },
  ],
};
