import { useRef, useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./Login.module.css";

import AuthContext from "../../store/auth-context";

const Login = () => {
  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onSignin = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    ctx.onLogin(enteredEmail, enteredPassword);
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
            required
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.control}>{ctx.errorMessage}</div>
        <div className={classes.actions}>
          {!ctx.loading ? <button>Login</button> : <p>Loading...</p>}
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
