import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import {
  Link,
  withRouter,
  useHistory,
} from 'react-router-dom';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core'

const DELETE_JWT = gql`
  mutation {
    deleteTokenCookie {
      deleted
    }
  }
  `


const Header = (props) => {
  const { isStaff } = props
  const history = useHistory()
  const [logout] = useMutation(DELETE_JWT)
  const [token, setToken] = React.useState(null)

  history.listen(history => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      setToken(token)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      setToken(token)
    }
    history.listen(history => {
      if (token !== null) {
        setToken(token)
      }
    })
  }, [history, token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    logout()
      .then(res => {
        history.go()
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (token !== null) {
    return (
      <div >
        <AppBar position="static">
          <Tabs
            value={false}
            centered
            aria-label="header links">
            <Tab component={Link} to='/' label="Home" />
            <Tab onClick={handleLogout} label="Logout" />
            {isStaff &&
              <Tab component={Link} to='/admin' label="Admin" />
            }
          </Tabs>
        </AppBar>
      </div>
    )
  } else {
    return (
      <div >
        <AppBar position="static">
          <Tabs
            value={false}
            centered
            aria-label="header links">
            <Tab component={Link} to='/' label="Home" />
            <Tab component={Link} to='/login' label="Login" />
          </Tabs>
        </AppBar>
      </div>
    )
  }

};

export default withRouter(Header);
