// https://usehooks.com/useAuth/
import React, { useState, useEffect, useContext, createContext } from 'react';
import firebaseCred from '../common/FirebaseCred';
import firebase from 'firebase/app';
require('firebase/auth');

// Add your Firebase credentials
firebase.initializeApp(firebaseCred);

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
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  // Also note :
  // If your effect returns a function, React will run it when it is time to clean up:
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const getUser = () => {
    return localStorage.getItem('authenticatedUser');
  };

  const setUser = (user) => {
    if (user != null) {
      localStorage.setItem('authenticatedUser', user);
    } else {
      localStorage.removeItem('authenticatedUser');
    }
  };

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
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
        setUser(user);
        return user;
        // ...
      })
      .catch((error) => {
        throw error;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  // Return the user object and auth methods
  return {
    getUser,
    signin,
    signout,
    googleSignIn,
  };
}
