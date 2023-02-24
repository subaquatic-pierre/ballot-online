import React, { useEffect } from "react";
import { Link, navigate } from "gatsby";
import { useMutation, gql } from "@apollo/client";
import { useLocation } from "@reach/router";

import { makeStyles } from "@material-ui/core";
import {
  Card,
  Button,
  Typography,
  FormControl,
  Grid,
  FormLabel,
  TextField,
} from "@material-ui/core";

import Layout from "../components/Layout";

const LOGIN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
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

const Login = () => {
  let token = null;
  const location = useLocation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login] = useMutation(LOGIN);
  const classes = useStyles();

  const handleTextChange = (event, id) => {
    if (id === "username") {
      setUsername(event.target.value);
    } else if (id === "password") {
      setPassword(event.target.value);
    }
  };

  const handleClick = () => {
    login({ variables: { username: username, password: password } })
      .then((res) => {
        token = res.data.tokenAuth.token;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token !== null) {
      location.assign("/");
    }
  }, [token, location]);

  return (
    <Layout>
      <Typography variant="h1">Login</Typography>
      <Grid container jutify="center">
        <Grid item sm={6}>
          <Card className={classes.card}>
            <form className={classes.form} noValidate autoComplete="off">
              <FormControl component="fieldset">
                <FormLabel component="legend">Login:</FormLabel>
                <TextField
                  label="Username or Email"
                  className={classes.textInput}
                  id="username"
                  value={username}
                  onChange={(event, id) => handleTextChange(event, "username")}
                />
                <TextField
                  className={classes.textInput}
                  id="password"
                  value={password}
                  onChange={(event, id) => handleTextChange(event, "password")}
                  label="Password"
                  type="password"
                />
              </FormControl>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Login
              </Button>
            </form>
            <Link to="/signup" className={classes.signup}>
              Signup
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
