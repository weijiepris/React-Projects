//@ts-nocheck
import React, { useState } from "react";
import _ from "lodash";

const AuthenticationContext = React.createContext({
  isLoggedIn: false,
  setState: (state: boolean) => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setState = (state: boolean) => {
    setIsLoggedIn((prevState) => (prevState = state));
  };

  return (
    <AuthenticationContext.Provider
      value={{ isLoggedIn: isLoggedIn, setState: setState }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
