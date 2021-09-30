import React, { useRef, useState, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const ScanOut = () => {
  const ctx = useContext(AuthContext);
  const outRef = useRef();
  const remarksRef = useRef();
  const [valid, setValid] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (event) => {
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
    console.log("product ID => ", prodID);

    const key = generateKey();
    var date = new Date();
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
        dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
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
          .update({ quantity: data.length - 1 });
      })
      .then(function () {
        setErrorMessage("Scan out successful");
      });
  };
  const scanIn = (event) => {
    event.preventDefault();
    const outValue = outRef.current.value;
    const remarks = remarksRef.current.value;

    if (
      outValue.includes("$%ForrestBrew%/") &&
      outValue.includes("https://forrestbrew.com/$%forrestbrew%/") &&
      outValue.includes("$%FORRESTBREW%/") &&
      outValue.includes("$%FORRESTbrew%/")
    ) {
      // https://forrestbrew.com/$%forrestbrew%/000$%ForrestBrew%/b001$%FORRESTBREW%/original$%FORRESTbrew%/
      // https://forrestbrew.com/$%forrestbrew%/001$%ForrestBrew%/b001$%FORRESTBREW%/apple-ginger$%FORRESTbrew%/
      var str = outValue;
      var res = str.split("$%FORRESTbrew%/");
      // console.log(res);
      if (res[1] !== "") {
        setErrorMessage("Invalid data entered");
      } else {
        // console.log("res => ", res);
        var res2 = res[0].split("$%ForrestBrew%/");
        // console.log("Res2 => ", res2);

        var res3 = res2[0].split("https://forrestbrew.com/$%forrestbrew%/");
        // console.log("res3 => ", res3);

        var res4 = res2[1].split("$%FORRESTBREW%/");

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
    <div className={classes.container}>
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
