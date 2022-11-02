import "./Login.css";

import { useRef, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { onLogin } from "./actions";
import { AUTHENTICATION_CONSTANTS } from "../../models/constants";

import AuthenticationContext from "../../store/authentication-content";
import _ from "lodash";

const Login = ({ alert }: any) => {
  const authenticationContext = useContext(AuthenticationContext);
  const emailRef: any = useRef();
  const passwordRef: any = useRef();

  const onSignin = () => {
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
      .then(() => {
        authenticationContext.setState(true);
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

  const onKeyPress = (event: any) => {
    if (event.key === "Enter") onSignin();
  };

  return (
    <section className="auth">
      <h1>AUBERCOT</h1>
      <br />
      <div>
        <InputText
          placeholder="Username"
          ref={emailRef}
          onKeyDown={(e) => onKeyPress(e)}
        />
      </div>
      <br />
      <div>
        <Password
          placeholder="Password"
          toggleMask
          feedback={false}
          inputRef={passwordRef}
          onKeyDown={(e) => onKeyPress(e)}
        />
      </div>
      <br />
      <Button onClick={onSignin}>Login</Button>
    </section>
  );
};

export default Login;
