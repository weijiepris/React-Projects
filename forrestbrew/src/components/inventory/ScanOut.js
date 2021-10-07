import React, { useRef, useState, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";

import AuthContext from "../../store/auth-context";
const ScanOut = () => {
  const ctx = useContext(AuthContext);
  const outRef = useRef();
  const remarksRef = useRef();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = () => {
    setErrorMessage("");
  };

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(0, 25);
  };
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  const addData = (data) => {
    setData((prevData) => {
      return [data, ...prevData];
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
  const insertData = (batchNo, prodID, remarks) => {
    console.log("batch number => ", batchNo);
    //   console.log("product ID => ", prodID);
    batchNo = batchNo.replaceAll("/", "");

    const key = generateKey();
    var date = new Date();

    let tempQuantity = 0;
    firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .doc(prodID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          tempQuantity = snapshot.data().quantity;
        }
      })
      .then(function () {
        if (tempQuantity > 0) {
          firebase
            .firestore()
            .collection("batch")
            .doc(ctx.currentUser.companyName)
            .collection("prodID")
            .doc(prodID)
            .collection("batchNo")
            .doc(batchNo)
            .get()
            .then((snapshot) => {
              if (snapshot.exists) {
                if (snapshot.data().quantity > 0) {
                  firebase
                    .firestore()
                    .collection("batch")
                    .doc(ctx.currentUser.companyName)
                    .collection("products")
                    .doc(key)
                    .set({
                      id: data.length + 1,
                      prodID: prodID,
                      batchNo: batchNo,
                      addedBy: ctx.currentUser.name,
                      dateAdded:
                        firebase.firestore.FieldValue.serverTimestamp(),
                      dateRemoved: "",
                      remarks: remarks,
                      companyName: ctx.currentUser.companyName,
                      companyID: ctx.currentUser.companyID,
                      scanType: "out",
                      uniqueID: key,
                    })
                    .then(function () {
                      addData({
                        id: data.length + 1,
                        prodID: prodID,
                        batchNo: batchNo,
                        addedBy: ctx.currentUser.name,
                        dateAdded: { seconds: toTimestamp(date) },
                        scanType: "out",
                        remarks: remarks,
                      });
                      firebase
                        .firestore()
                        .collection("products")
                        .doc(ctx.currentUser.companyName)
                        .collection("products")
                        .doc(prodID)
                        .update({
                          quantity: firebase.firestore.FieldValue.increment(-1),
                        })
                        .then(function () {
                          firebase
                            .firestore()
                            .collection("batch")
                            .doc(ctx.currentUser.companyName)
                            .collection("prodID")
                            .doc(prodID)
                            .collection("batchNo")
                            .doc(batchNo)
                            .set(
                              {
                                quantity:
                                  firebase.firestore.FieldValue.increment(-1),
                                batchNo: batchNo,
                              },
                              { merge: true }
                            );
                        });
                    })
                    .then(function () {
                      setErrorMessage("Scan out successful");
                    });
                } else if (snapshot.data().quantity < 0) {
                  firebase
                    .firestore()
                    .collection("batch")
                    .doc(ctx.currentUser.companyName)
                    .collection("prodID")
                    .doc(prodID)
                    .collection("batchNo")
                    .doc(batchNo)
                    .set(
                      {
                        quantity: 0,
                        batchNo: batchNo,
                      },
                      { merge: true }
                    );
                } else {
                  setErrorMessage("Invalid data entered");
                }
              } else {
                setErrorMessage("Invalid data entered");
              }
            });
        } else {
          setErrorMessage("Invalid data entered");
        }
      });
  };
  const scanIn = (event) => {
    event.preventDefault();
    const outValue = outRef.current.value;
    const remarks = remarksRef.current.value;

    if (
      outValue.includes("/$FB/") &&
      outValue.includes("$fb/") &&
      outValue.includes("$Fb/") &&
      outValue.includes("$fB/")
    ) {
      // /$FB/001$fb/27/10/21$Fb/apple-ginger$fB/

      var str = outValue;
      // console.log(str);
      var res = str.split("$fB/");
      // console.log(res);
      if (res[1] !== "") {
        setErrorMessage("Invalid data entered111");
      } else {
        // console.log("res => ", res);
        var res2 = res[0].split("$fb/");
        // console.log("Res2 => ", res2);

        var res3 = res2[0].split("/$FB/");
        // console.log("res3 => ", res3);

        var res4 = res2[1].split("$Fb/");

        // console.log("res4 => ", res4);

        if (res3[0] === "") {
          let batchNo = res4[0];
          let prodID = res3[1];
          insertData(batchNo, prodID, remarks);
        } else {
          setErrorMessage("Invalid data entered");
        }
      }
    } else {
      setErrorMessage("Invalid data entered");
    }
    outRef.current.value = "";
  };

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Scan Out</span>
      <div className={classes.wrapper}>
        <br />
        <br />
        <form onSubmit={scanIn}>
          <input
            type="text"
            placeholder="SCAN QR CODE"
            ref={outRef}
            onChange={onChange}
          />
        </form>
        <input type="text" placeholder="REMARKS" ref={remarksRef} />
        <div>{errorMessage}</div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th>Product ID</th>
                <th>Batch No</th>
                <th>Action by</th>
                <th>Date</th>
                <th>Action</th>
                <th>Remarks</th>
              </tr>
              {data.map((entry) => (
                <tr key={generateKey()} className={classes.trow}>
                  <td>{entry.prodID}</td>
                  <td>{entry.batchNo}</td>
                  <td>{entry.addedBy}</td>
                  <td>{getDate(entry.dateAdded["seconds"])}</td>
                  <td>{entry.scanType}</td>
                  <td>{entry.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScanOut;
