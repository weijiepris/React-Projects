import React, { useContext, useEffect } from "react";
// import firebase from "firebase";
import classes from "./misc.module.css";
import AuthContext from "../../store/auth-context";
const Dev = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log(ctx);
  });

  return (
    <div className={classes.container} id="container">
      test
    </div>
  );
};

export default Dev;
