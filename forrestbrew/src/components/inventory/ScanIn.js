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
    // integrate();
    // console.log("summary => ", summary);
    // console.log("data => ", data);
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
      // console.log(i);

      let res = i.split("//");
      // console.log(res);
      r.push({
        prodID: res[0],
        batchNo: res[1],
        prodName: res[2].replace("-", " "),
        dateAdded: { seconds: toTimestamp(date) },
        amount: result[i],
      });
    }
    setObj(r);
  }, [data]);

  const onChange = (event) => {
    setErrorMessage("");
  };

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
  const insertData = (batchNo, prodID, prodName, remarks) => {
    // console.log("batch number => ", batchNo);
    // console.log("product ID => ", prodID);

    var date = new Date();
    addData({
      id: data.length + 1,
      prodID: prodID,
      batchNo: batchNo,
      prodName: prodName,
      addedBy: ctx.currentUser.name,
      dateAdded: { seconds: toTimestamp(date) },
      remarks: remarks,
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
        setErrorMessage("Invalid data entered111");
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
          let prodName = res4[1];
          insertData(batchNo, prodID, prodName, remarks);
        } else {
          setErrorMessage("Invalid data entered11");
        }
      }
    } else {
      setErrorMessage("Invalid data entered1");
    }
    outRef.current.value = "";
  };

  const testf = () => {
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
            id: data.length + 1,
            prodID: d.prodID,
            batchNo: d.batchNo,
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
            firebase
              .firestore()
              .collection("products")
              .doc(ctx.currentUser.companyName)
              .collection("products")
              .doc(d.prodID)
              .update({
                quantity: firebase.firestore.FieldValue.increment(1),
              });
          })
          .then(function () {
            // console.log("test new batch id");
            // console.log("d.prod id > ", d.prodID);
            // console.log("d.batchNo id > ", d.batchNo);
            firebase
              .firestore()
              .collection("batch")
              .doc(ctx.currentUser.companyName)
              .collection("prodID")
              .doc(d.prodID)
              .collection("batchNo")
              .doc(d.batchNo)
              .set(
                {
                  quantity: firebase.firestore.FieldValue.increment(1),
                  dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                  batchNo: d.batchNo,
                  prodName: d.prodName,
                },
                { merge: true }
              );
          })
          .then(function () {
            setErrorMessage("data entered successfully");
            setObj([]);
            setData([]);
          });
      }
    });
  };

  // const updateAmount = (event) => {
  //   console.log(event);
  // };
  return (
    <div className={classes.container}>
      <span className={classes.overview}>Scan In</span>
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
                <th>Product Name</th>
                <th>Amount</th>
              </tr>
              {obj.map((entry) => (
                <tr key={generateKey()} className={classes.trow}>
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
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button onClick={testf}>Save input</button>
        </div>
      </div>
    </div>
  );
};

export default ScanIn;
