import React, { useEffect } from "react";

import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Box, makeStyles } from "@material-ui/core";
import { Typography, Card, Grid, Button } from "@material-ui/core";

import Alert from "../components/Alert";
import QuestionCard from "../components/QuestionCard";
import Divider from "../components/Divider";
import Loading from "../components/Loading";

import Layout from "../components/Layout";

const QUESTIONS_QUERY = gql`
  query {
    questions {
      edges {
        node {
          id
          title
          subtitle
          created
          questionType
          expires
          choices {
            id
            title
          }
        }
      }
    }
  }
`;

const MAKE_QUERY = gql`
  query TestQuery {
    viewer {
      username
      isStaff
    }
  }
`;

const ADMIN_QUERY = gql`
  query TestQuery {
    viewer {
      username
      isStaff
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2rem 0",
    padding: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  testCard: {
    margin: "2rem 0",
    padding: "2rem",
    width: "100%",
  },
  textInput: {
    marginTop: "2rem",
  },
  button: {
    marginTop: "2rem",
    display: "block",
  },
  delButton: {
    backgroundColor: theme.palette.error.main,
    display: "block",
  },
  signup: {
    color: "white",
    marginTop: "1rem",
  },
}));

const Home = (props) => {
  let admin = false;
  // const [admin, setAdmin] = React.useState(false)
  const [makeQuery, makeQueryRes] = useLazyQuery(MAKE_QUERY);
  const classes = useStyles();
  const { data, loading, error } = useQuery(QUESTIONS_QUERY);
  const staffQuery = useQuery(ADMIN_QUERY);

  const handleClickTest = async () => {
    try {
      await makeQuery();
    } catch {
      console.log("There was an error with the query");
    }
  };
  useEffect(() => {
    // setAdmin(staffQuery.data)
  }, []);
  admin = staffQuery.data;
  return (
    <Layout>
      <Typography variant="h1">Home</Typography>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>
          <Alert severity="error">{error.message}</Alert>
        </div>
      ) : (
        data.questions.edges.map((question, index) => {
          if (index + 1 === data.questions.length) {
            return (
              <div key={index}>
                <QuestionCard
                  {...question.node}
                  isStaff={admin && admin.viewer.isStaff}
                />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <QuestionCard
                  {...question.node}
                  isStaff={admin && admin.viewer.isStaff}
                />
                <Divider />
              </div>
            );
          }
        })
      )}
      <Grid container jutify="center">
        <Grid item sm={6}>
          <Card className={classes.testCard}>
            <Typography variant="h5">Test Area</Typography>
            {makeQueryRes.error ? (
              <>
                <Typography variant="h6">Error</Typography>
                <Box>
                  <pre>
                    {JSON.stringify(makeQueryRes.error.message, null, 2)}
                  </pre>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6">Success</Typography>
                <Box>
                  <pre>{JSON.stringify(makeQueryRes.data, null, 2)}</pre>
                </Box>
              </>
            )}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleClickTest}
            >
              TEST
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
