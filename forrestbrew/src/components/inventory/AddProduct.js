import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Redirect, Link } from "react-router-dom";

const AddProduct = (props) => {
  const userid = firebase.auth().currentUser.uid;
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docID, setDocID] = useState("");

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
    console.log("company name: " + props.location.state.companyName);
    count = await firebase
      .firestore()
      .collection("companies")
      .doc(props.location.state.companyName)
      .collection("product")
      .get()
      .then((snapshot) => {
        console.log("snapshot: ");
        count = snapshot.size;
      })
      .then(function () {
        console.log(count);
        if (count == 0) {
          count = 1;
        } else {
          count++;
        }
        console.log("doc id:" + docID);
        firebase
          .firestore()
          .collection("companies")
          .doc(props.location.state.companyName)
          .collection("product")
          .add({
            serialno: count,
            id: prodID,
            name: prodName,
            description: prodDesc,
            quantity: 0,
            datecreated: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(function () {
            setRedirect(true);
          });
      });
  };

  if (redirect) {
    return <Redirect push to="/" exact />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={add}>
        <input type="text" placeholder="Product Name" ref={prodNameRef} />
        <br></br>
        <input type="text" placeholder="Product ID" ref={prodIDRef} />
        <br></br>
        <input
          type="text"
          placeholder="Product Description"
          ref={prodDescRef}
        />
        <br></br>
        <button>Add Product</button>
        <Link to="/viewInventory" exact="true">
          <button>Go Back</button>
        </Link>
        {loading ? <div>Adding new product, Please wait . . .</div> : ""}
      </form>
    </div>
  );
};

export default AddProduct;
