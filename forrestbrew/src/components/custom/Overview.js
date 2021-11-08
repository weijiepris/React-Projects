import React, { useContext, useEffect } from "react";
import classes from "./custom.module.css";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
const Overview = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log(ctx);
  });

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Overview</span>
      <br />
      <div className={classes.wrapper}>
        <Link to="/Hotel">Create New Hotel</Link>
        <br />
        <Link to="/Fermentation">Create New Fermentation</Link>
      </div>
      <br />
    </div>
  );
};

export default Overview;
