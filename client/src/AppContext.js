import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyBtoNxYtxecScRZKFTzgRILaraL8MYunHQ",
  authDomain: "user-app-f64d5.firebaseapp.com",
  projectId: "user-app-f64d5",
  storageBucket: "user-app-f64d5.appspot.com",
  messagingSenderId: "821405046679",
  appId: "1:821405046679:web:1ab5d238e8b9e5b28e16d2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");
  let history = useHistory();

  const handleSignOut = () => {
    signOut();
    setAppUser({});
    history.push(`/`);
  };

  useEffect(() => {
    if (user) {
      fetch(`/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setAppUser(json.data);
          setMessage(json.message);
        });
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{ appUser, signInWithGoogle, message, handleSignOut }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
