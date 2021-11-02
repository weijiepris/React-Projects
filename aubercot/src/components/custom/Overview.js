import React, { useContext, useEffect } from "react";
// import firebase from "firebase";
import classes from "./custom.module.css";
import AuthContext from "../../store/auth-context";
const Overview = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log(ctx);
  });

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Overview</span>
      <br />
      <div className={classes.wrapper}></div>
      <br />
    </div>
  );
};

export default Overview;
