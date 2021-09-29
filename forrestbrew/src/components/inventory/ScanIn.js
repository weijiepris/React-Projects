import React, { useRef, useState, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const ScanIn = () => {
  const ctx = useContext(AuthContext);
  const outRef = useRef();
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
  const insertData = (batchNo, prodID) => {
    console.log("batch number => ", batchNo);
    console.log("product ID => ", prodID);

    const key = generateKey();
    var date = new Date();
    addData({
      id: data.length + 1,
      prodID: prodID,
      batchNo: batchNo,
      addedBy: ctx.currentUser.name,
      dateAdded: { seconds: toTimestamp(date) },
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
      // https://forrestbrew.com/$%forrestbrew%/001$%ForrestBrew%/b001$%FORRESTBREW%/
      var str = outValue;
      var res = str.split("$%FORRESTBREW%/");
      if (res[1] !== "") {
        setErrorMessage("Invalid data entered");
      } else {
        // console.log("res => ", res);
        var res2 = res[0].split("$%ForrestBrew%/");
        // console.log(res2);

        var res3 = res2[0].split("https://forrestbrew.com/$%forrestbrew%/");
        // console.log(res3);

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

  const updateAmount = (event, prodID, batchNo) => {
    console.log(event);
  };
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
        <div>{errorMessage}</div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th>Product ID</th>
                <th>Batch No</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
              {data.map((entry) => (
                <tr key={generateKey()} className={classes.trow}>
                  <td>{entry.prodID}</td>
                  <td>{entry.batchNo}</td>
                  <td>{getDate(entry.dateAdded["seconds"])}</td>
                  <td>
                    <input
                      type="text"
                      defaultValue="1"
                      onChange={updateAmount(entry.prodID, entry.batchNo)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button>Save input</button>
        </div>
      </div>
    </div>
  );
};

export default ScanIn;
