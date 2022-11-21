import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import firebase from "firebase";

const AuthenticationContext = React.createContext({
  isLoaded: false,
  isLoggedIn: false,
  setState: (state: boolean) => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    verifyLoginMemo
      .then((res: boolean) => {
        setState(res);
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, []);

  const verifyLoginStatus = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  };

  const setState = (state: boolean) => {
    setIsLoggedIn((prevState) => (prevState = state));
  };

  const verifyLoginMemo = useMemo(() => verifyLoginStatus(), [isLoggedIn]);

  return (
    <AuthenticationContext.Provider
      value={{ isLoaded: isLoaded, isLoggedIn: isLoggedIn, setState: setState }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
