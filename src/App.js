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
          <PrivateRoute path="/app">
            <AppScreen />
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
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
        auth.user ? (
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
  return (
    <div>
      <p> Hello </p>
    </div>
  );
}
