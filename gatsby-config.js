require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: "Ballot Online",
    siteUrl: "https://ballot-online.zeroisone.io",
    description: "The best ballot voting website",
  },

  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
    },
  ],
};
