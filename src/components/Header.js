import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { useLocation } from "@reach/router";

import { Link } from "gatsby";

import { AppBar, Tabs, Tab } from "@material-ui/core";

const DELETE_JWT = gql`
  mutation {
    deleteTokenCookie {
      deleted
    }
  }
`;

const Header = (props) => {
  const location = useLocation();
  const { isStaff } = props;
  const [logout] = useMutation(DELETE_JWT);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
    }
  }, [location, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    logout()
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (token !== null) {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={false} centered aria-label="header links">
            <Tab component={Link} to="/" label="Home" />
            <Tab onClick={handleLogout} label="Logout" />
            {isStaff && <Tab component={Link} to="/admin" label="Admin" />}
          </Tabs>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={false} centered aria-label="header links">
            <Tab component={Link} to="/" label="Home" />
            <Tab component={Link} to="/login" label="Login" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
};

export default Header;
