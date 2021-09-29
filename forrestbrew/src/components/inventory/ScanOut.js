import React, { useRef, useState, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";

import AuthContext from "../../store/auth-context";
const ScanOut = () => {
  const ctx = useContext(AuthContext);
  const outRef = useRef();
  const [valid, setValid] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (event) => {
    setErrorMessage("");
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
  const insertData = (batchNo, prodID) => {
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
        remarks: "",
        companyName: ctx.currentUser.companyName,
        companyID: ctx.currentUser.companyID,
        scanType: "out",
        uniqueID: key,
      })
      .then(function () {
        addData({
          id: data.length + 1,
          batchNo: batchNo,
          addedBy: ctx.currentUser.name,
          dateAdded: { seconds: toTimestamp(date) },
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
        setErrorMessage("data entered successfully");
      });
  };
  const scanIn = (event) => {
    event.preventDefault();
    const outValue = outRef.current.value;

    if (
      outValue.includes("$%ForrestBrew%/") &&
      outValue.includes("https://forrestbrew.com/$%forrestbrew%/") &&
      outValue.includes("$%FORRESTBREW%/")
    ) {
      // https://forrestbrew.com/$%forrestbrew%/000$%ForrestBrew%/b001$%FORRESTBREW%/
      var str = outValue;
      var res = str.split("$%FORRESTBREW%/");
      if (res[1] !== "") {
        setErrorMessage("Invalid data entered");
      } else {
        console.log("res => ", res);
        var res2 = res[0].split("$%ForrestBrew%/");
        console.log(res2);

        var res3 = res2[0].split("https://forrestbrew.com/$%forrestbrew%/");
        console.log(res3);

        if (res3[0] === "") {
          let batchNo = res2[1];
          let prodID = res3[1];
          insertData(batchNo, prodID);
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
      <form onSubmit={scanIn}>
        <input
          type="text"
          placeholder="QR CODE / UNIQUE ID"
          ref={outRef}
          onChange={onChange}
        />
      </form>
      <div>{errorMessage}</div>
    </div>
  );
};

export default ScanOut;
