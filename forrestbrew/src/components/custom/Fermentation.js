import React, { useContext, useEffect, useRef } from "react";
// import firebase from "firebase";
import classes from "./custom.module.css";
import AuthContext from "../../store/auth-context";
const Fermentation = () => {
  const ctx = useContext(AuthContext);
  const batchNoRef = useRef();
  const amountRef = useRef();
  const dateCreatedRef = useRef();

  useEffect(() => {
    console.log(ctx);
  });

  const createHotelHandler = () => {};
  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Hotel Creation - Dev</span>
      <br />
      <div className={classes.wrapper}>
        <form onSubmit={createHotelHandler}>
          <br />
          <input
            type="text"
            placeholder="Hotel Batch Number"
            ref={batchNoRef}
          />
          <br />
          <input type="text" placeholder="Amount in Litres" ref={amountRef} />
          <br />
          <input type="date" placeholder="Date Created" ref={dateCreatedRef} />
          <br />
          <br />
          <input type="submit" value="Create" />
          <br />
          <br />
        </form>
      </div>
      <br />
    </div>
  );
};

export default Fermentation;
