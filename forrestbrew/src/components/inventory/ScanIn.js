import React, { useRef, useState, useContext, useEffect } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";

import AuthContext from "../../store/auth-context";
const ScanIn = () => {
  const ctx = useContext(AuthContext);
  const outRef = useRef();
  const remarksRef = useRef();
  const [obj, setObj] = useState([]);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const result = [];
    var date = new Date();
    data.forEach((x) => {
      // console.log("test => ", x.prodID);
      result[x.prodID + "//" + x.batchNo + "//" + x.prodName] =
        (result[x.prodID + "//" + x.batchNo + "//" + x.prodName] || 0) + 1;
    });
    // console.log(result);
    const r = [];
    for (let i in result) {
      let res = i.split("//");
      // console.log(res);
      r.push({
        prodID: res[0],
        batchNo: res[1],
        prodName: res[2],
        dateAdded: { seconds: toTimestamp(date) },
        amount: result[i],
        remarks: document.getElementById("remarks").value,
      });
    }
    setObj(r);

    return () => {
      setObj([]);
    };
  }, [data]);

  const onChange = (event) => {
    setErrorMessage("");
  };

  // const getDateToday = () => {
  //   return new Date().toString().substring(0, 15).replaceAll(" ", "");
  // };

  // const getDate = (date) => {
  //   return new Date(date * 1000).toString().substring(0, 25);
  // };

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
    let t = false;
    batchNo = batchNo.replaceAll("/", "");

    firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .where("prodID", "==", prodID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          t = true;
          var date = new Date();
          addData({
            id: data.length + 1,
            prodID: prodID,
            batchNo: batchNo,
            prodName: doc.data().name,
            addedBy: ctx.currentUser.name,
            dateAdded: { seconds: toTimestamp(date) },
            remarks: remarks,
          });
        });
      })
      .then(function () {
        if (!t) {
          setErrorMessage(
            "Product does not exists or has not been created yet."
          );
          document.getElementById("errorMessage").style.backgroundColor = "red";
          document.getElementById("errorMessage").style.color = "white";
        }
      });
  };

  const scanIn = (event) => {
    event.preventDefault();
    const outValue = outRef.current.value;
    const remarks = remarksRef.current.value;
    // console.log(outValue);

    if (outValue.includes("`")) {
      // FBK0000`101221
      var str = outValue;
      // console.log(str);
      var res = str.split("`");
      // console.log(res);
      if (res.length === 2) {
        if (
          res[0].replaceAll(" ", "").length > 1 &&
          res[1].replaceAll(" ", "").length > 1 &&
          res[1].length === 6
        ) {
          let prodID = res[0];
          let batchNo = res[1];
          prodID = prodID.toUpperCase();

          insertData(batchNo, prodID, remarks);
        } else {
          setErrorMessage("Invalid data entered");
          document.getElementById("errorMessage").style.backgroundColor = "red";
          document.getElementById("errorMessage").style.color = "white";
        }
      } else {
        setErrorMessage("Invalid data entered");
        document.getElementById("errorMessage").style.backgroundColor = "red";
        document.getElementById("errorMessage").style.color = "white";
      }
    } else {
      setErrorMessage("Invalid data entered");
      document.getElementById("errorMessage").style.backgroundColor = "red";
      document.getElementById("errorMessage").style.color = "white";
    }
    outRef.current.value = "";
  };

  const saveInput = () => {
    // console.log(getDateToday());
    if (obj.length === 0) {
      setErrorMessage("Please scan in first");
      document.getElementById("errorMessage").style.backgroundColor = "red";
      document.getElementById("errorMessage").style.color = "white";
    } else {
      obj.forEach((d) => {
        let amount = document.getElementById(d.prodID + d.batchNo).value;
        // console.log(d.prodName, ", ", d.batchNo, " => ", amount);
        for (let i = 0; i < amount; i++) {
          const key = generateKey();
          // var date = new Date();
          firebase
            .firestore()
            .collection("batch")
            .doc(ctx.currentUser.companyName)
            .collection("products")
            .doc(key)
            .set({
              prodName: d.prodName,
              prodID: d.prodID,
              batchNo: d.batchNo,
              addedBy: ctx.currentUser.name,
              removedBy: "",
              dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
              dateRemoved: "",
              remarks: d.remarks,
              remarksOut: "",
              companyName: ctx.currentUser.companyName,
              companyID: ctx.currentUser.companyID,
              scanType: "in",
              uniqueID: key,
            })
            .then(function () {
              setErrorMessage("data entered successfully");
              setObj([]);
              setData([]);
            });
        }
      });
    }
  };

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Scan In</span>
      <br />
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
        <input
          type="text"
          placeholder="REMARKS"
          id="remarks"
          ref={remarksRef}
        />
        <div id="errorMessage">{errorMessage}</div>
      </div>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th>Product ID</th>
                <th>Batch No</th>
                <th>Product Name</th>
                <th>Amount</th>
                <th>Remarks</th>
              </tr>
              {obj.map((entry) => (
                <tr key={generateKey()} className={classes.scanIn}>
                  <td>{entry.prodID}</td>
                  <td>{entry.batchNo}</td>
                  <td>{entry.prodName}</td>
                  <td>
                    <input
                      type="text"
                      id={entry.prodID + entry.batchNo}
                      defaultValue={entry.amount}
                    />
                  </td>
                  <td>{entry.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button onClick={saveInput}>Save input</button>
        </div>
      </div>
    </div>
  );
};

export default ScanIn;
