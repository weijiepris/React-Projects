import React, { useRef, useState } from "react";
import { Redirect, Link } from "react-router-dom";

import firebase from "firebase";
import classes from "./Login.module.css";

const Register = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const contactInputRef = useRef();
  const companyNameInputRef = useRef();
  const companyIDInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  console.log(props.isLoggedIn);
  const onSignUp = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredContact = contactInputRef.current.value;
    const enteredCompanyName = companyNameInputRef.current.value;
    const enteredCompanyID = companyIDInputRef.current.value;
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email: enteredEmail,
            name: enteredName,
            contact: enteredContact,
            address1: "",
            address2: "",
            zip: "",
            gender: "",
            dateRegistered: firebase.firestore.FieldValue.serverTimestamp(),
            picture: "",
            bio: "",
            userRole: "default",
            companyName: enteredCompanyName,
            companyID: enteredCompanyID,
          });
        console.log(result);
      })
      .then(function () {
        firebase
          .firestore()
          .collection("companies")
          .doc(enteredCompanyName)
          .set({
            companyName: enteredCompanyName,
            companyID: enteredCompanyID,
            datecreated: firebase.firestore.FieldValue.serverTimestamp(),
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setErrorMessage(error.message);
            break;
          case "auth/email-already-in-use":
            setErrorMessage(error.message);
            break;
          default:
            console.log(error);
            break;
        }
      });
  };

  return (
    <section className={classes.auth}>
      {props.isLoggedIn && <Redirect to="/" />}
      <h1>Register</h1>
      <form onSubmit={onSignUp}>
        <div className={classes.control}>
          <input
            type="email"
            placeholder="E-Mail"
            required
            ref={emailInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="Name"
            required
            ref={nameInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="number"
            placeholder="Contact Number"
            required
            ref={contactInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="Company Name"
            ref={companyNameInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="Company ID"
            ref={companyIDInputRef}
          ></input>
        </div>
        <div className={classes.control}>{errorMessage}</div>
        <div className={classes.actions}>
          <button>Register</button>
        </div>
        <div className={classes.register}>
          Have an account?{" "}
          <Link to="/" exact="true">
            Click Here to log in
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
