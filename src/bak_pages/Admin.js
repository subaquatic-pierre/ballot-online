import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Grid, Card, Button } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";

const QUERY_USERS = gql`
  query {
    users {
      id
      username
      password
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
  },
  textInput: {
    marginTop: "2rem",
  },
  button: {
    marginTop: "2rem",
    display: "block",
  },
  signup: {
    color: "white",
    marginTop: "1rem",
  },
}));

const Admin = (props) => {
  const classes = useStyles();
  const { data, loading } = useQuery(QUERY_USERS);

  const handleCreateQuestionClick = () => {
    props.history.push("/create-question");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Typography variant="h1">Admin</Typography>
      <Grid container jutify="center">
        <Grid item sm={6}>
          <Card className={classes.card}>
            <Typography variant="h6">Create Question</Typography>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleCreateQuestionClick}
            >
              Create Question
            </Button>
          </Card>
          <Card className={classes.card}>
            <Typography variant="h6">Users</Typography>
            {data &&
              data.users.map(({ id, username, password }) => (
                <div key={id}>
                  <p>UserName: {username}</p>
                  <p>Password: {password}</p>
                </div>
              ))}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
