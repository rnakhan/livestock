import React, { useContext, createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import AppScreen from './AppScreen';
import { ProvideAuth, useAuth } from './hooks/UseAuth';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/">
            <AppScreen />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.getUser() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const [unAuthorized, setUnAuthorized] = useState(false);

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {
    auth
      .googleSignIn()
      .then((user) => {
        if (!!user) {
          history.replace(from);
        } else {
          setUnAuthorized(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
      {unAuthorized && <p> You are not Authorized on this site. Sorry!</p>}
    </div>
  );
}
