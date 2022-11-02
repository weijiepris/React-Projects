import { Button } from "primereact/button";
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import { onLogout } from "./auth/actions";

import AuthenticationContext from "../store/authentication-content";

const HomePage = () => {
  const authenticationContext = useContext(AuthenticationContext);

  const logoutHandler = () => {
    onLogout().then((res) => {
      authenticationContext.setState(res);
    });
  };

  return (
    <div>
      home page
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default HomePage;
