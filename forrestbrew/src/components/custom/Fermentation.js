import React, { useContext, useRef, useState } from "react";
import firebase from "firebase";
import classes from "./custom.module.css";
import AuthContext from "../../store/auth-context";
import { Redirect, Link } from "react-router-dom";
const Fermentation = () => {
  const ctx = useContext(AuthContext);
  const batchNoRef = useRef();
  const amountRef = useRef();
  const dateCreatedRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createFermentationHandler = (event) => {
    event.preventDefault();

    if (document.getElementById("hotelDetails") === "") {
      console.log("select a hotel batch first");
    } else {
      const batchNo = batchNoRef.current.value;
      const amount = amountRef.current.value;
      const dateCreated = dateCreatedRef.current.value;
      createFermentation(batchNo, amount, dateCreated);
    }
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

  const createFermentation = (batchNo, amount, dateCreated) => {
    let hotelNo = document.getElementById("hotelDetails").value;
    setErrorMessage("");
    console.log("hotelNo", hotelNo);
    console.log(batchNo, amount, dateCreated);
    const key = generateKey();
    ctx.hotel.forEach((d) => {
      if (d.batchNo === hotelNo) {
        if (d.amount < amount) {
          setErrorMessage("not enough amount");
          document.getElementById("errorMessage").style.color = "red";
        } else {
          let exists = false;
          ctx.fermentation.forEach((d) => {
            if (d.batchNo === batchNo) {
              exists = true;
            }
          });
          if (!exists) {
            firebase
              .firestore()
              .collection("fermentation")
              .doc(key)
              .set({
                type: "fermentation",
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
          } else {
            setErrorMessage("batch already exists");
            document.getElementById("errorMessage").style.color = "red";
          }
        }
      }
    });
  };

  const HotelDetails = () => {
    console.log(ctx.hotel);
    ctx.hotel.sort(function (a, b) {
      return a.batchNo - b.batchNo;
    });
    return (
      <div>
        <br />
        <h3>Hotel details</h3>
        <select
          className={classes.input}
          id="hotelDetails"
          onChange={getHotelDetails}
        >
          <option value="">Select Hotel Batch</option>
          {ctx.hotel.map((d) => (
            <option value={d.batchNo}>Hotel {d.batchNo}</option>
          ))}
        </select>
        <div id="hotelResults"></div>
      </div>
    );
  };

  const getHotelDetails = () => {
    let doc = document.getElementById("hotelDetails");
    console.log(doc.value);

    if (doc.value !== "") {
      let div = document.getElementById("hotelResults");
      div.innerHTML = "";
      ctx.hotel.forEach((d) => {
        if (d.batchNo === doc.value) {
          console.log(d);
          let input = document.createElement("INPUT");
          input.value = d.amount + " litres remaining";
          input.className = classes.input;
          input.disabled = true;
          div.append(input);
        }
      });

      document.getElementById("createBtn").disabled = false;
    } else {
      document.getElementById("hotelResults").innerHTML = "";
      document.getElementById("createBtn").disabled = true;
    }
  };

  if (redirect) {
    return <Redirect push to="/Overview" exact />;
  }

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Fermentation Creation</span>
      <br />
      <div className={classes.wrapper}>
        <HotelDetails />{" "}
        <form onSubmit={createFermentationHandler}>
          <br />
          <input
            type="text"
            placeholder="Fermentation Batch Number"
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
          <span id="errorMessage">{errorMessage}</span>
          <br />
          <br />
          <input
            type="submit"
            value="Create"
            id="createBtn"
            className={classes.input}
            disabled
          />
          <br />
          <br />
        </form>
      </div>
      <br />
    </div>
  );
};

export default Fermentation;
