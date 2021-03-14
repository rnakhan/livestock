import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AppScreen from './AppScreen';
import { ProvideAuth, useAuth } from './hooks/UseAuth';
import LoginPage from './LoginPage';

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
