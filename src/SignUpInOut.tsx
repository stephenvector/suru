import React, { useEffect, useState } from "react";
import { FormApi } from "final-form";
import { Form, Field } from "react-final-form";
import firebase from "firebase";
import "firebase/auth";

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
  actionType: ActionType;
};

const INITIAL_VALUES: SignUpInOutFormValues = {
  email: "",
  password: "",
  actionType: ACTION_SIGN_UP
};

type SignUpInOutProps = {
  signedIn: boolean;
};

export default function SignUpInOut({ signedIn }: SignUpInOutProps) {
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

  function signOutHandler() {
    firebase.auth().signOut();
  }

  function onSubmit(
    { email, password, actionType }: SignUpInOutFormValues,
    form: FormApi<SignUpInOutFormValues>
  ) {
    switch (actionType) {
      case ACTION_SIGN_UP:
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      case ACTION_SIGN_IN:
        return firebase.auth().signInWithEmailAndPassword(email, password);
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
        <button onClick={signOutHandler} className="PlainButton" type="button">
          {ACTION_TITLES[ACTION_SIGN_OUT]}
        </button>
      )}

      {!signedIn && showDialogue && (
        <div className="SignUpInOutDialogue">
          <div className="SignUpInOutDialogContent">
            <button
              className="ExitButton"
              onClick={closeDialogue}
              type="button"
            >
              exit
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
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    component="input"
                    type="password"
                    placeholder="******"
                  />
                  {currentAction === ACTION_SIGN_IN && (
                    <div>Forgot your password?</div>
                  )}
                  <Field
                    name="actionType"
                    component="input"
                    type="hidden"
                    value={currentAction}
                  />
                  <button className="Button" type="submit">
                    {ACTION_TITLES[currentAction]}
                  </button>
                </form>
              )}
            </Form>

            {currentAction === ACTION_SIGN_IN && (
              <button
                type="button"
                className="PlainButton"
                onClick={signUpButtonHandler}
              >
                Need an account?
              </button>
            )}

            {currentAction === ACTION_SIGN_UP && (
              <button type="button" className="PlainButton">
                Already have an account?
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
