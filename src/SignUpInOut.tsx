import React, { useEffect, useState } from "react";
import { FormApi } from "final-form";
import { Form, Field } from "react-final-form";
import firebase from "firebase";
import "firebase/auth";
import { CurrentUser } from "./App";

const ACTION_SIGN_UP: ActionType = "signup";
const ACTION_SIGN_OUT: ActionType = "signout";
const ACTION_RESET_PASSWORD: ActionType = "resetpassword";
const ACTION_SIGN_IN: ActionType = "signin";

type ActionType = "signup" | "signout" | "resetpassword" | "signin";

const ACTION_TITLES: { [actionType in ActionType]: string } = {
  [ACTION_SIGN_UP]: "Sign Up",
  [ACTION_SIGN_OUT]: "Sign Out",
  [ACTION_RESET_PASSWORD]: "Reset Password",
  [ACTION_SIGN_IN]: "Sign In"
};

type SignUpInOutFormValues = {
  email: string;
  password: string;
};

const INITIAL_VALUES: SignUpInOutFormValues = {
  email: "",
  password: ""
};

type SignUpInOutProps = {
  signedIn: boolean;
  currentUser: CurrentUser;
};

export default function SignUpInOut({
  signedIn,
  currentUser
}: SignUpInOutProps) {
  const [showDialogue, setShowDialogue] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>(
    ACTION_SIGN_UP
  );

  useEffect(() => {
    function handleEscapeKey(e: KeyboardEvent) {
      if (showDialogue && e.code === "Escape") {
        setShowDialogue(false);
      }
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showDialogue]);

  function closeDialogue() {
    setShowDialogue(false);
  }

  function signUpButtonHandler() {
    setShowDialogue(true);
    setCurrentAction(ACTION_SIGN_UP);
  }

  function signInButtonHandler() {
    setShowDialogue(true);
    setCurrentAction(ACTION_SIGN_IN);
  }

  function passwordResetButtonHandler() {
    setShowDialogue(true);
    setCurrentAction(ACTION_RESET_PASSWORD);
  }

  function signOutHandler() {
    firebase.auth().signOut();
  }

  function onSubmit(
    { email, password }: SignUpInOutFormValues,
    form: FormApi<SignUpInOutFormValues>
  ) {
    switch (currentAction) {
      case ACTION_SIGN_UP:
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      case ACTION_SIGN_IN:
        return firebase.auth().signInWithEmailAndPassword(email, password);
      case ACTION_RESET_PASSWORD:
        return firebase.auth().sendPasswordResetEmail(email);
      default:
        return;
    }
  }

  return (
    <div>
      {!signedIn && (
        <>
          <button
            className="PlainButton"
            onClick={signUpButtonHandler}
            type="button"
          >
            {ACTION_TITLES[ACTION_SIGN_UP]}
          </button>
          <span>&nbsp;</span>
          <button
            className="PlainButton"
            onClick={signInButtonHandler}
            type="button"
          >
            {ACTION_TITLES[ACTION_SIGN_IN]}
          </button>
        </>
      )}
      {signedIn && (
        <>
          {currentUser.email}
          <button
            onClick={signOutHandler}
            className="PlainButton"
            type="button"
          >
            {ACTION_TITLES[ACTION_SIGN_OUT]}
          </button>
        </>
      )}

      {!signedIn && showDialogue && (
        <div className="SignUpInOutDialogue">
          <div className="SignUpInOutDialogContent">
            <button
              className="ExitButton"
              onClick={closeDialogue}
              type="button"
            >
              &times;
            </button>
            <h2>{ACTION_TITLES[currentAction]}</h2>
            <Form onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    component="input"
                    type="email"
                    placeholder="email@domain.com"
                  />
                  {(currentAction === ACTION_SIGN_IN ||
                    currentAction === ACTION_SIGN_UP) && (
                    <>
                      <label htmlFor="password">Password</label>
                      <Field
                        id="password"
                        name="password"
                        component="input"
                        type="password"
                        placeholder="******"
                      />
                    </>
                  )}
                  <button className="Button" type="submit">
                    {ACTION_TITLES[currentAction]}
                  </button>
                </form>
              )}
            </Form>

            {currentAction === ACTION_SIGN_IN && (
              <>
                <p>
                  <button
                    type="button"
                    className="PlainButton"
                    onClick={passwordResetButtonHandler}
                  >
                    Forgot your password?
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    className="PlainButton"
                    onClick={signUpButtonHandler}
                  >
                    Need an account?
                  </button>
                </p>
              </>
            )}

            {currentAction === ACTION_SIGN_UP && (
              <p>
                <button
                  onClick={signInButtonHandler}
                  type="button"
                  className="PlainButton"
                >
                  Already have an account?
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
