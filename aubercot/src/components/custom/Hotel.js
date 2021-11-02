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

  const createHotel = (batchNo, amount, dateCreated) => {
    console.log(batchNo, amount, dateCreated);

    firebase
      .firestore()
      .collection("hotel")
      .doc(ctx.currentUser.companyName)
      .collection(batchNo)
      .add({
        batchNo: batchNo,
        amount: amount,
        dateCreated: dateCreated,
        createdBy: ctx.currentUser.name,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        status: "",
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

export default Hotel;
