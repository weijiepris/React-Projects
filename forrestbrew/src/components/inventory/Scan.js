import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const Scan = (props) => {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(4, 21);
  };

  const fetchData = async () => {
    console.log("fetching data for scan history");

    const batchRef = firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products");

    const batchSnapshot = await batchRef.get();
    let arr = [];
    batchSnapshot.forEach((doc) => {
      let inArr = [];
      let outArr = [];
      if (doc.data().dateRemoved === "") {
        arr.push(doc.data());
      } else {
        inArr = doc.data();
        inArr.scanType = "in";
        outArr = doc.data();
        outArr.dateAdded = outArr.dateRemoved;
        if (outArr.removedBy === "" || !outArr.removedBy) {
          outArr.addedBy = outArr.addedBy;
        } else {
          outArr.addedBy = outArr.removedBy;
        }
        arr.push(inArr);
        arr.push(outArr);
      }

      arr.sort(function (a, b) {
        var textA = a.scanType.toUpperCase();
        var textB = b.scanType.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      arr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(b.dateAdded["seconds"]) - new Date(a.dateAdded["seconds"])
        );
      });

      addData(arr);
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData([]); // clean up
    };
  }, [ctx.currentUser.companyName]);

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
  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Scan In/Out</span>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.actions}>
          <br />
          <Link to="/ScanIn">
            <button>Scan In</button>
          </Link>
          <Link to="/ScanOut">
            <button>Scan Out</button>
          </Link>
        </div>
      </div>

      <div className={classes.wrapper}>
        <h1>Transaction History</h1>
        <div className={classes.content}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th>Product ID</th>
                <th>Batch No</th>
                <th>Action</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>User</th>
              </tr>
              {data[0] ? (
                data[0].map((entry) => (
                  <tr key={generateKey()} className={classes.trow}>
                    <td>{entry.prodID}</td>
                    <td>{entry.batchNo}</td>
                    <td>{entry.scanType}</td>
                    <td>{getDate(entry.dateAdded["seconds"])}</td>
                    <td>{entry.remarks}</td>
                    <td>{entry.addedBy}</td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scan;
