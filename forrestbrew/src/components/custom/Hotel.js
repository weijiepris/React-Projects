import React, { useContext, useEffect, useRef, useState } from "react";
import firebase from "firebase";
import classes from "./custom.module.css";
import AuthContext from "../../store/auth-context";
import { Redirect, Link } from "react-router-dom";
const Hotel = () => {
  const ctx = useContext(AuthContext);
  const batchNoRef = useRef();
  const amountRef = useRef();
  const dateCreatedRef = useRef();

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    console.log(ctx);
  });

  const createHotelHandler = (event) => {
    event.preventDefault();
    const batchNo = batchNoRef.current.value;
    const amount = amountRef.current.value;
    const dateCreated = dateCreatedRef.current.value;
    createHotel(batchNo, amount, dateCreated);
  };

  const generateKey = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let autoId = "";
    for (let i = 0; i < 30; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  };

  const createHotel = (batchNo, amount, dateCreated) => {
    console.log(batchNo, amount, dateCreated);
    const key = generateKey();
    firebase
      .firestore()
      .collection("hotel")
      .doc(key)
      .set({
        type: "hotel",
        batchNo: batchNo,
        amount: amount,
        dateCreated: dateCreated,
        createdBy: ctx.currentUser.name,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        status: "",
        key: key,
      })
      .then(function () {
        console.log("success");
        setRedirect(true);
      });
  };

  if (redirect) {
    return <Redirect push to="/Overview" exact />;
  }

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Hotel Creation</span>
      <br />
      <div className={classes.wrapper}>
        <form onSubmit={createHotelHandler}>
          <br />
          <input
            type="text"
            placeholder="Hotel Batch Number"
            ref={batchNoRef}
            className={classes.input}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Amount in Litres"
            ref={amountRef}
            className={classes.input}
            required
          />
          <br />
          <input
            type="date"
            placeholder="Date Created"
            ref={dateCreatedRef}
            className={classes.input}
            required
          />
          <br />
          <br />
          <input type="submit" value="Create" className={classes.input} />
          <br />
          <br />
        </form>
      </div>
      <br />
    </div>
  );
};

export default Hotel;
