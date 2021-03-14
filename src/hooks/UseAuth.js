// https://usehooks.com/useAuth/
import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebase, firestore } from '../common/firebase';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const getUser = () => {
    return JSON.parse(localStorage.getItem('authenticatedUser'));
  };

  const setUser = (user) => {
    if (user != null) {
      localStorage.setItem('authenticatedUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authenticatedUser');
    }
  };

  const googleSignIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        return firestore
          .collection('admins')
          .doc(user.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUser(user);
              return user;
            } else {
              return null;
            }
          })
          .catch((error) => {
            throw error;
          });
      });
  };

  const signout = (postSignoutFn) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        postSignoutFn();
      });
  };

  // Return the user object and auth methods
  return {
    getUser,
    signout,
    googleSignIn,
  };
}
