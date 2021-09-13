import React, { useRef, useState, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Redirect, Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const AddProduct = () => {
  const ctx = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const prodNameRef = useRef();
  const prodIDRef = useRef();
  const prodDescRef = useRef();

  const add = async (event) => {
    setLoading(true);
    event.preventDefault();
    const prodName = prodNameRef.current.value;
    const prodID = prodIDRef.current.value;
    const prodDesc = prodDescRef.current.value;
    let count = 0;
    console.log("company name: " + ctx.currentUser.companyName);
    count = await firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .get()
      .then((snapshot) => {
        console.log("snapshot: ");
        count = snapshot.size;
      })
      .then(function () {
        console.log(count);
        if (count === 0) {
          count = 1;
        } else {
          count++;
        }
        firebase
          .firestore()
          .collection("products")
          .doc(ctx.currentUser.companyName)
          .collection("products")
          .doc(prodID)
          .set({
            serialno: count,
            id: prodID,
            name: prodName,
            description: prodDesc,
            quantity: 0,
            remarks: "",
            companyName: ctx.currentUser.companyName,
            companyID: ctx.currentUser.companyID,
            createdBy: ctx.currentUser.name,
            category: "drinks",
            status: "available",
            datecreated: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(function () {
            setRedirect(true);
          });
      });
  };

  if (redirect) {
    return <Redirect push to="/viewInventory" exact />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="Product Name"
          ref={prodNameRef}
          className={classes.input}
        />
        <br></br>
        <input
          type="text"
          placeholder="Product ID"
          ref={prodIDRef}
          className={classes.input}
        />
        <br></br>
        <input
          type="text"
          placeholder="Product Description"
          ref={prodDescRef}
          className={classes.input}
        />
        <br></br>
        <br></br>
        <button className={classes.button}>Add Product</button>
        <Link to="/viewInventory" exact="true">
          <button className={classes.button}>Go Back</button>
        </Link>
        {loading ? <div>Adding new product, Please wait . . .</div> : ""}
      </form>
    </div>
  );
};

export default AddProduct;
