import { useRef, useContext, useState } from "react";
import "./Login.css";

import AuthContext from "../../store/auth-context";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import _ from "lodash";
import { onLogin } from "./actions";
import { AUTHENTICATION_CONSTANTS } from "../../models/constants";

const Login = ({ alert }: any) => {
  const [state, setState] = useState(true);

  const ctx = useContext(AuthContext);

  const emailRef: any = useRef();
  const passwordRef: any = useRef();

  const onSignin = (event: any) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (_.isEmpty(email)) {
      alert({ message: "Invalid username/password", type: "error" });
      emailRef.current.focus();
      return;
    }

    if (_.isEmpty(password)) {
      alert({ message: "Invalid username/password", type: "error" });
      passwordRef.current.focus();
      return;
    }

    onLogin(email, password)
      .then((response) => {
        console.log("successfully logged in", response);
        // to set state to logged in
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            alert({
              message: AUTHENTICATION_CONSTANTS.ACCOUNT_NOT_FOUND,
              type: "error",
            });
            emailRef.current.focus();
            break;
          case "auth/wrong-password":
            alert({
              message: AUTHENTICATION_CONSTANTS.INVALID_PASSWORD,
              type: "error",
            });
            passwordRef.current.focus();
            break;
          case "auth/invalid-email":
            alert({
              message: AUTHENTICATION_CONSTANTS.INVALID_EMAIL,
              type: "error",
            });
            emailRef.current.focus();
            break;
          case "auth/user-disabled":
            alert({
              message: AUTHENTICATION_CONSTANTS.ACCOUNT_DISABLED,
              type: "error",
            });
            break;
          default:
            console.log("unexpected error", error);
            alert({
              message: AUTHENTICATION_CONSTANTS.UNEXPECTED_ERROR_OCCURED,
              type: "error",
            });
            break;
        }
      });
  };

  return (
    <section className="auth">
      <h1>AUBERCOT</h1>
      <br />
      <div>
        <InputText placeholder="Username" ref={emailRef} />
      </div>
      <br />
      <div>
        <Password
          placeholder="Password"
          toggleMask
          feedback={false}
          inputRef={passwordRef}
        />
      </div>
      <br />
      <Button onClick={onSignin}>Login</Button>
    </section>
  );
};

export default Login;
