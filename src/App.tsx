import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import SignUpInOut from "./SignUpInOut";
import Masthead from "./Masthead";
import Demo from "./Demo";

export default function App() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setSignedIn(true);
        // // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // // ...
      } else {
        setSignedIn(false);
      }
      setCheckedAuth(true);
    });
  }, []);

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>suru</h1>
        {checkedAuth && <SignUpInOut signedIn={signedIn} />}
      </header>

      <Masthead />

      <Demo />
    </div>
  );
}
