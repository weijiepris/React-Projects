import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import firebase from "firebase";

const AuthenticationContext = React.createContext({
  isLoaded: false,
  isLoggedIn: false,
  userToken: "",
  setState: (state: boolean) => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    verifyLoginMemo
      .then((res: boolean) => {
        setState(res);
      })
      .then(() => {
        setIsLoaded(true);
      });

    return () => {
      setUserToken("");
      setIsLoggedIn(false);
    };
  }, []);

  const verifyLoginStatus = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => setUserToken(token));
          resolve(true);
        } else {
          resolve(false);
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
      value={{
        isLoaded: isLoaded,
        isLoggedIn: isLoggedIn,
        userToken: userToken,
        setState: setState,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
