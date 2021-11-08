import React, { useState, useEffect, useContext } from "react";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const Scan = (props) => {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [dataF, setDataF] = useState([]);

  // const getExpire = (day) => {
  //   let d = new Date();
  //   d.setDate(d.getDate() - parseInt(day));
  //   return d.toString().substring(4, 15);
  // };

  const getDate = (date) => {
    if (date === null) {
      return 0;
    } else {
      return new Date(date["seconds"] * 1000).toString().substring(4, 24);
    }
  };

  const getDate2 = (date) => {
    if (date === null) {
      return 0;
    } else {
      return new Date(date["seconds"] * 1000).toString().substring(4, 15);
    }
  };

  const filterDate = (event) => {
    let filterDay = event.target.value;
    setData([]);
    let arr = [];
    let today = new Date().toString().substring(4, 15);
    for (let i in filterData[0]) {
      let date = getDate2(filterData[0][i].dateAdded);
      if (
        Math.floor(
          (new Date(today) - new Date(date)) / (1000 * 60 * 60 * 24)
        ) <= filterDay
      ) {
        arr.push(filterData[0][i]);
      }
      addData(arr);
    }
    filterInfo();
  };
  const filterInfo = () => {
    let summarized = document.getElementById("detail").value === "true";

    if (!summarized) {
      setDataF([]);
    } else {
      let dataset = JSON.parse(JSON.stringify(data));
      // console.log(new Date().toString().substring(4, 15));
      let arr = [];
      dataset[0].forEach((d) => {
        if (
          !arr[
            d.prodID +
              "//" +
              d.prodName +
              "//" +
              d.batchNo +
              "//" +
              d.scanType +
              "//" +
              getDate2(d.dateAdded) +
              "//" +
              d.remarks +
              "//" +
              d.addedBy
          ]
        ) {
          arr[
            d.prodID +
              "//" +
              d.prodName +
              "//" +
              d.batchNo +
              "//" +
              d.scanType +
              "//" +
              getDate2(d.dateAdded) +
              "//" +
              d.remarks +
              "//" +
              d.addedBy
          ] = 1;
        } else {
          arr[
            d.prodID +
              "//" +
              d.prodName +
              "//" +
              d.batchNo +
              "//" +
              d.scanType +
              "//" +
              getDate2(d.dateAdded) +
              "//" +
              d.remarks +
              "//" +
              d.addedBy
          ] += 1;
        }
      });

      let tempArr = [];
      for (let i in arr) {
        let res = i.split("//");
        tempArr.push({
          prodID: res[0],
          prodName: res[1],
          batchNo: res[2],
          scanType: res[3],
          dateAdded: res[4],
          remarks: res[5],
          addedBy: res[6],
          count: arr[i],
        });
      }
      let r = [];
      tempArr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      });
      r.push(tempArr);
      setDataF(r);
    }
  };
  useEffect(() => {
    let arr = [];
    let arr2 = [];
    ctx.batch.forEach((bdoc) => {
      let inArr = [];
      let outArr = [];
      if (bdoc.dateRemoved === "") {
        if (
          getDate2(bdoc.dateAdded) === new Date().toString().substring(4, 15)
        ) {
          arr2.push(JSON.parse(JSON.stringify(bdoc)));
        }
        arr.push(JSON.parse(JSON.stringify(bdoc)));
      } else {
        inArr = JSON.parse(JSON.stringify(bdoc));
        inArr.scanType = "in";
        outArr = JSON.parse(JSON.stringify(bdoc));
        outArr.dateAdded = outArr.dateRemoved;

        if (outArr.removedBy === "" || !outArr.removedBy) {
        } else {
          outArr.addedBy = outArr.removedBy;
        }

        if (outArr.remarksOut === "" || !outArr.remarksOut) {
        } else {
          outArr.remarks = outArr.remarksOut;
        }

        if (
          getDate2(inArr.dateAdded) === new Date().toString().substring(4, 15)
        ) {
          arr2.push(inArr);
        }

        if (
          getDate2(outArr.dateAdded) === new Date().toString().substring(4, 15)
        ) {
          arr2.push(outArr);
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
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      });
      arr2.sort(function (a, b) {
        var textA = a.scanType.toUpperCase();
        var textB = b.scanType.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      arr2.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(getDate(b.dateAdded)) - new Date(getDate(a.dateAdded));
      });

      addData(arr2);
      addFilter(arr);
    });
    return () => {
      setData([]); // clean up
    };
  }, [ctx.product, ctx.batch]);

  const addData = (data) => {
    setData((prevData) => {
      return [data, ...prevData];
    });
  };
  const addFilter = (data) => {
    setFilterData((prevData) => {
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
      <span className={classes.overview}>
        Scan In/Out &nbsp;
        <select id="charts" name="charts" onChange={filterDate}>
          <option value="0">Today</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="9999">All Time</option>
        </select>
      </span>
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
        <h1>
          Transaction History &nbsp;
          <select id="detail" name="charts" onChange={filterInfo}>
            <option value={false}>Detailed</option>
            <option value={true}>Summarised</option>
          </select>
        </h1>
        <table
          className={classes.table}
          style={{
            left: "-8px",
            position: "relative",
          }}
        >
          <tbody>
            {dataF.length !== 0 ? (
              <tr>
                <th
                  style={{
                    width: "150px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    width: "185px",
                  }}
                >
                  Product ID
                </th>
                <th
                  style={{
                    width: "120px",
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    width: "190px",
                  }}
                >
                  Batch No
                </th>
                <th
                  style={{
                    position: "relative",
                    left: "-50px",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    position: "relative",
                    left: "-70px",
                  }}
                >
                  Action
                </th>
                <th
                  style={{
                    position: "relative",
                    left: "-60px",
                  }}
                >
                  Remarks
                </th>
                <th
                  style={{
                    position: "relative",
                    left: "-20px",
                  }}
                >
                  User
                </th>
              </tr>
            ) : (
              <tr>
                <th
                  style={{
                    width: "250px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    width: "170px",
                  }}
                >
                  Product ID
                </th>
                <th
                  style={{
                    width: "130px",
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    width: "155px",
                  }}
                >
                  Batch No
                </th>
                <th
                  style={{
                    width: "10px",
                  }}
                >
                  Action
                </th>
                <th>Remarks</th>
                <th>User</th>
              </tr>
            )}
          </tbody>
        </table>
        <div className={classes.content}>
          <table className={classes.table}>
            <tbody>
              {dataF.length !== 0 ? (
                dataF[0] ? (
                  dataF[0].map((entry) => (
                    <tr key={generateKey()} className={classes.trow}>
                      <td>
                        {entry.dateAdded.length !== 11
                          ? getDate(entry.dateAdded)
                          : entry.dateAdded}
                      </td>
                      <td>{entry.prodID}</td>
                      <td>{entry.prodName}</td>
                      <td>{entry.batchNo}</td>
                      <td>{entry.count}</td>
                      <td>{entry.scanType}</td>
                      <td>{entry.remarks}</td>
                      <td>{entry.addedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )
              ) : data[0] ? (
                data[0].map((entry) => (
                  <tr key={generateKey()} className={classes.trow}>
                    <td>
                      {entry.dateAdded.length !== 11
                        ? getDate(entry.dateAdded)
                        : entry.dateAdded}
                    </td>
                    <td>{entry.prodID}</td>
                    <td>{entry.prodName}</td>
                    <td>{entry.batchNo}</td>
                    <td>{entry.scanType}</td>
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
