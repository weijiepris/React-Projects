import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import firebase from "firebase";
import classes from "./Login.module.css";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignin = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((result) => {
        setLoading(false);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/wrong-password":
            setErrorMessage("Invalid Username/Password");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid Username/Password");
            break;
          default:
            break;
        }
      })
      .then(function () {
        setLoading(false);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={onSignin}>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="E-Mail"
            required
            ref={emailInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.control}>{errorMessage}</div>
        <div className={classes.actions}>
          {!loading ? <button>Login</button> : <p>Loading...</p>}
        </div>
        <div className={classes.register}>
          Don't have an account?{" "}
          <Link to="/register">Click Here to sign up</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
