import React from "react";
import classes from "./inventory.module.css";

const Checker = () => {
  return (
    <div className={classes.container}>
      <input type="text" placeholder="SCAN QR CODE"  />
    </div>
  );
};

export default Checker;
