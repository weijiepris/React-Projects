import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const Scan = (props) => {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(0, 25);
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .orderBy("dateAdded", "asc")
      .get()
      .then((snapshot) => {
        if (snapshot.size) {
          snapshot.forEach((doc) => {
            addData(doc.data());
          });
        }
      });
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
                <th>Action by</th>
                <th>Date</th>
                <th>Remarks</th>
              </tr>
              {data.map((entry) => (
                <tr key={generateKey()} className={classes.trow}>
                  <td>{entry.prodID}</td>
                  <td>{entry.batchNo}</td>
                  <td>{entry.scanType}</td>
                  <td>{entry.addedBy}</td>
                  <td>{getDate(entry.dateAdded["seconds"])}</td>
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

export default Scan;
