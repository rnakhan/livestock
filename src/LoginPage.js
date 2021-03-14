import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from './hooks/UseAuth';

const LoginPage = () => {
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

  /* return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
      {unAuthorized && <p> You are not Authorized on this site. Sorry!</p>}
    </div>
  ); */

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment>
            <Button color="blue" onClick={login}>
              <Icon name="google" /> Sign in with Google
            </Button>
          </Segment>
        </Form>
        {unAuthorized && (
          <Message color="red">
            This is a private site and you are not Authorized sorry!
          </Message>
        )}
        {!unAuthorized && <Message>This is a private site.</Message>}
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
