import React, { useRef, useState, useContext, useEffect } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";

import AuthContext from "../../store/auth-context";
const ScanOut = () => {
  const ctx = useContext(AuthContext);
  const [obj, setObj] = useState([]);
  const outRef = useRef();
  const remarksRef = useRef();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const result = [];
    data.forEach((x) => {
      // console.log("test => ", x.prodID);
      result[
        x.prodID + "//" + x.batchNo + "//" + x.prodName + "//" + x.remarks
      ] =
        (result[
          x.prodID + "//" + x.batchNo + "//" + x.prodName + "//" + x.remarks
        ] || 0) + 1;
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
        amount: result[i],
        remarks: res[3],
      });
    }
    setObj(r);
  }, [data]);

  const onChangeUpdateObj = (event) => {
    let res = event.target.id.split("//");
    for (let i in obj) {
      if (
        res[0] === obj[i].prodID &&
        res[1] === obj[i].batchNo &&
        res[2] === obj[i].remarks
      )
        obj[i].amount = parseInt(event.target.value);
    }
  };
  const onChange = () => {
    setErrorMessage("");
  };

  // const getDate = (date) => {
  //   return new Date(date * 1000).toString().substring(0, 25);
  // };

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
    // to check if the prodID,batchNo is available, then get first doc

    ctx.batch.forEach((bdoc) => {
      if (
        bdoc.prodID === prodID &&
        bdoc.batchNo === batchNo &&
        bdoc.scanType === "in"
      ) {
        if (!t) {
          addData({
            id: data.length + 1,
            prodID: prodID,
            batchNo: batchNo,
            prodName: bdoc.prodName,
            addedBy: ctx.currentUser.name,
            remarks: remarks,
          });
        }
        t = true;
      }
    });
    if (!t) {
      setErrorMessage(
        "Product ID or Batch No does not exists or has not been created yet. HOL"
      );
      document.getElementById("errorMessage").style.backgroundColor = "red";
      document.getElementById("errorMessage").style.color = "white";
    }
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
    setErrorMessage("");
    let arrayCheck = [];
    console.log(obj);
    for (let i in obj) {
      if (
        !arrayCheck[
          obj[i].prodID + "//" + obj[i].batchNo + "//" + obj[i].remarks
        ]
      ) {
        arrayCheck[
          obj[i].prodID + "//" + obj[i].batchNo + "//" + obj[i].remarks
        ] = 0;
      }
      arrayCheck[
        obj[i].prodID + "//" + obj[i].batchNo + "//" + obj[i].remarks
      ] += obj[i].amount;
    }
    console.log(arrayCheck);

    for (let i in arrayCheck) {
      let res = i.split("//");

      let prodID = res[0];
      let batchNo = res[1];
      let remarks = res[2];
      let count = 0;
      ctx.batch.forEach((bdoc) => {
        if (
          bdoc.prodID === prodID &&
          bdoc.batchNo === batchNo &&
          bdoc.scanType === "in"
        ) {
          count++;
        }
      });
      console.log(count, "bottles of", prodID, batchNo);
      if (arrayCheck[i] > count) {
        setErrorMessage(
          "Exceeded amount for " + prodID + " (Remaining amount: " + count + ")"
        );
        document.getElementById("errorMessage").style.backgroundColor = "red";
        document.getElementById("errorMessage").style.color = "white";
      } else {
        console.log("scanning out");
        let counter = 0;
        ctx.batch.forEach((bdoc) => {
          if (
            counter < arrayCheck[i] &&
            bdoc.prodID === prodID &&
            bdoc.batchNo === batchNo &&
            bdoc.scanType === "in"
          ) {
            firebase
              .firestore()
              .collection("batch")
              .doc(ctx.currentUser.companyName)
              .collection("products")
              .doc(bdoc.uniqueID)
              .update({
                dateRemoved: firebase.firestore.FieldValue.serverTimestamp(),
                scanType: "out",
                removedBy: ctx.currentUser.name,
                remarksOut: remarks,
              })
              .then(function () {
                setErrorMessage("data entered successfully");
                setObj([]);
                setData([]);
              });
            counter += 1;
          }
        });
        // for (let j = 0; j < arrayCheck[i]; j++) {
        //   let curKey = ctx.batch.forEach((bdoc) => {
        //     if (
        //       bdoc.prodID === prodID &&
        //       bdoc.batchNo === batchNo &&
        //       bdoc.scanType === "in"
        //     ) {
        //       return bdoc.uniqueID;
        //     }
        //   });
        //   console.log("for", prodID, batchNo, remarks);
        //   console.log(curKey);
        //   firebase
        //     .firestore()
        //     .collection("batch")
        //     .doc(ctx.currentUser.companyName)
        //     .collection("products")
        //     .doc(curKey)
        //     .update({
        //       dateRemoved: firebase.firestore.FieldValue.serverTimestamp(),
        //       scanType: "out",
        //       removedBy: ctx.currentUser.name,
        //       remarksOut: remarks,
        //     })
        //     .then(function () {
        //       setErrorMessage("data entered successfully");
        //       document.getElementById("errorMessage").style.backgroundColor =
        //         "white";
        //       document.getElementById("errorMessage").style.color = "black";
        //       setObj([]);
        //       setData([]);
        //     });

        // ctx.batch.forEach((bdoc) => {
        //   if (
        //     bdoc.prodID === d.prodID &&
        //     bdoc.batchNo === d.batchNo &&
        //     bdoc.scanType === "in"
        //   ) {
        //     firebase
        //       .firestore()
        //       .collection("batch")
        //       .doc(ctx.currentUser.companyName)
        //       .collection("products")
        //       .doc(bdoc.uniqueID)
        //       .update({
        //         dateRemoved:
        //           firebase.firestore.FieldValue.serverTimestamp(),
        //         scanType: "out",
        //         removedBy: ctx.currentUser.name,
        //         remarksOut: d.remarks,
        //       })
        //       .then(function () {
        //         setErrorMessage("data entered successfully");
        //         setObj([]);
        //         setData([]);
        //       });
        //   }
        // });
        // firebase
        //   .firestore()
        //   .collection("batch")
        //   .doc(ctx.currentUser.companyName)
        //   .collection("products")
        //   .where("prodID", "==", d.prodID)
        //   .where("batchNo", "==", d.batchNo)
        //   .where("scanType", "==", "in")
        //   .limit(d.amount)
        //   .get()
        //   .then((snapshot) => {
        // snapshot.forEach( (doc) => {
        //    firebase
        //     .firestore()
        //     .collection("batch")
        //     .doc(ctx.currentUser.companyName)
        //     .collection("products")
        //     .doc(doc.id)
        //     .update({
        //       dateRemoved:
        //         firebase.firestore.FieldValue.serverTimestamp(),
        //       scanType: "out",
        //       removedBy: ctx.currentUser.name,
        //       remarksOut: d.remarks,
        //     })
        //     .then(function () {
        //       setErrorMessage("data entered successfully");
        //       setObj([]);
        //       setData([]);
        //     });
        // });
        // });
        // }
      }
    }
    // for (let i in arrayCheck) {
    //   firebase
    //     .firestore()
    //     .collection("batch")
    //     .doc(ctx.currentUser.companyName)
    //     .collection("products")
    //     .where("prodID", "==", i)
    //     .where("scanType", "==", "in")
    //     .get()
    //     .then((snapshot) => {
    //       if (arrayCheck[i] > snapshot.docs.length) {
    //         setErrorMessage(
    //           "Exceeded amount for " +
    //             i +
    //             " (Remaining amount: " +
    //             snapshot.docs.length +
    //             ")"
    //         );
    //         document.getElementById("errorMessage").style.backgroundColor =
    //           "red";
    //         document.getElementById("errorMessage").style.color = "white";
    //       } else {
    //         obj.forEach((d) => {
    //           // console.log(d);
    //           for (let i = 0; i < d.amount; i++) {
    //             firebase
    //               .firestore()
    //               .collection("batch")
    //               .doc(ctx.currentUser.companyName)
    //               .collection("products")
    //               .where("prodID", "==", d.prodID)
    //               .where("batchNo", "==", d.batchNo)
    //               .where("scanType", "==", "in")
    //               .limit(d.amount)
    //               .get()
    //               .then((snapshot) => {
    //                 snapshot.forEach(async (doc) => {
    //                   await firebase
    //                     .firestore()
    //                     .collection("batch")
    //                     .doc(ctx.currentUser.companyName)
    //                     .collection("products")
    //                     .doc(doc.id)
    //                     .update({
    //                       dateRemoved:
    //                         firebase.firestore.FieldValue.serverTimestamp(),
    //                       scanType: "out",
    //                       removedBy: ctx.currentUser.name,
    //                       remarksOut: d.remarks,
    //                     })
    //                     .then(function () {
    //                       setErrorMessage("data entered successfully");
    //                       setObj([]);
    //                       setData([]);
    //                     });
    //                 });
    //               });
    //           }
    //         });

    //         setErrorMessage("data entered successfully");
    //         document.getElementById("errorMessage").style.backgroundColor =
    //           "white";
    //         document.getElementById("errorMessage").style.color = "black";
    //       }
    //     });
    // }
  };

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Scan Out</span>
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
          <br />
          <input
            type="text"
            placeholder="REMARKS"
            id="remarks"
            ref={remarksRef}
          />
          <br />
          <button>Enter</button>
          <br />
          <br />
        </form>
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
                <tr key={generateKey()} className={classes.scanOut}>
                  <td>{entry.prodID}</td>
                  <td>{entry.batchNo}</td>
                  <td>{entry.prodName}</td>
                  <td>
                    <input
                      type="number"
                      id={
                        entry.prodID +
                        "//" +
                        entry.batchNo +
                        "//" +
                        entry.remarks
                      }
                      onChange={onChangeUpdateObj}
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

export default ScanOut;
