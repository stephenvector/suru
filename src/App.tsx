import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import SignUpInOut from "./SignUpInOut";
import Masthead from "./Masthead";
import Demo from "./Demo";

export type CurrentUser = {
  uid: string;
  email: string;
};

const DEFAULT_CURRENT_USER: CurrentUser = {
  uid: "",
  email: ""
};

export default function App() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(DEFAULT_CURRENT_USER);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setSignedIn(true);
        const { uid, email } = user;
        if (email !== null) {
          setCurrentUser({ uid, email });
        }
      } else {
        setSignedIn(false);
        setCurrentUser(DEFAULT_CURRENT_USER);
      }
      setCheckedAuth(true);
    });
  }, []);

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>suru</h1>
        {checkedAuth && (
          <SignUpInOut currentUser={currentUser} signedIn={signedIn} />
        )}
      </header>

      <Masthead />

      <Demo />
    </div>
  );
}
