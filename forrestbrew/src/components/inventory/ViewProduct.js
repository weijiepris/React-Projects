import React, { useRef, useState, useEffect, useContext } from "react";
import firebase from "firebase";
// import classes from "./inventory.module.css";
import Modal from "../Reusables/Modal";
import AuthContext from "../../store/auth-context";
const ViewProduct = (props) => {
  const ctx = useContext(AuthContext);

  const dataInputRef = useRef();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [dataExists, setDataExists] = useState(true);

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(0, 25);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .get()
      .then((snapshot) => {
        if (snapshot.size) {
          snapshot.forEach((doc) => {
            if (props.data.data.id === doc.data().prodID) {
              addData(doc.data());
            }
          });
        } else {
          setDataExists(false);
        }
        setLoadingData(true);
      });

    // firebase
    // .firestore()
    // .collection("batch")
    // .doc(ctx.currentUser.companyName)
    // .collection("products")
    // .where("id", "==", props.data.data.id)
    // .orderBy("dateAdded", "asc")
    // .get()
    // .then((snapshot) => {
    //   if (snapshot.exists) {
    //     console.log("data exists");
    //   } else {
    //     console.log("data do not exists");
    //   }
    //   snapshot.forEach((doc) => {
    //     addData(doc.data());
    //   });
    //   setLoadingData(true);
    // });
  }, [ctx.currentUser.companyName, props.data.data.id]);

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  const addData = (data) => {
    setData((prevData) => {
      return [data, ...prevData];
    });
  };

  const insertData = (event) => {
    const key = generateKey();
    event.preventDefault();
    const enteredData = dataInputRef.current.value;
    var date = new Date();
    setIsLoaded(false);
    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .doc(key)
      .set({
        id: data.length + 1,
        prodID: props.data.data.id,
        batchNo: enteredData,
        addedBy: ctx.currentUser.name,
        dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
        dateRemoved: "",
        remarks: "",
        companyName: ctx.currentUser.companyName,
        companyID: ctx.currentUser.companyID,
        scanType: "in",
        uniqueID: key,
      })
      .then(function () {
        addData({
          id: data.length + 1,
          batchNo: enteredData,
          addedBy: ctx.currentUser.name,
          dateAdded: { seconds: toTimestamp(date) },
        });
        firebase
          .firestore()
          .collection("products")
          .doc(ctx.currentUser.companyName)
          .collection("products")
          .doc(props.data.data.id)
          .update({ quantity: data.length + 1 });

        setIsLoaded(true);
      });
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
  return (
    <Modal onClose={props.onClose}>
      <div>
        <li>Product ID: {props.data.data.id}</li>
        <li>Product Name: {props.data.data.name}</li>
        <li>Product Quantity: {props.data.data.quantity}</li>
        <li>Product Description: {props.data.data.description}</li>
        <li>
          Product Created Date:
          {getDate(props.data.data.datecreated["seconds"])}
        </li>
      </div>
      <br></br>

      <form onSubmit={insertData}>
        <input type="text" placeholder="Batch No" ref={dataInputRef} />
        {isLoaded ? <button>Insert data</button> : "Adding data . . ."}
      </form>
      <table>
        <tbody>
          {!loadingData ? (
            <tr>
              <td>Loading . . .</td>
            </tr>
          ) : (
            <tr>
              <td>Batch Number</td>
              <td>Added By</td>
              <td>Date Added</td>
              <td>Action</td>
              <td>Remarks</td>
            </tr>
          )}
          {data.map((entry) => (
            <tr key={entry.uniqueID}>
              <td>{entry.batchNo}</td>
              <td>{entry.addedBy}</td>
              <td>{getDate(entry.dateAdded["seconds"])}</td>
              <td>{entry.scanType}</td>
              <td>{entry.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {dataExists ? <div></div> : <div>No data found</div>}
    </Modal>
  );
};

export default ViewProduct;
