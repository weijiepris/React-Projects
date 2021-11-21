import React, { useState, useEffect, useContext } from "react";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const Scan = (props) => {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [dataF, setDataF] = useState([]);
  const [filterDay, setFilterDay] = useState("0");
  const [filterBy, setFilterBy] = useState("true");
  const [tempData, setTempData] = useState([]);
  const [custom, setCustom] = useState(false);
  const [customData, setCustomData] = useState([]);
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
    setFilterDay(filterDay);
  };

  const filterInfo = (event) => {
    let filterBy = event.target.value;
    setFilterBy(filterBy);
  };

  useEffect(() => {
    setTempData([]);
    console.log("ctx", ctx.copyData);
    ctx.copyData.forEach((cdoc) => {
      addTempData(cdoc);
    });

    return () => {
      setData([]); // clean up
    };
  }, [ctx.product, ctx.batch, ctx.copyData]);

  useEffect(() => {
    if (filterDay === "custom") {
      setCustom(true);
      // console.log(data);
      if (filterBy === "true") {
        summarisedData(customData, null);
      } else {
        detailedData(customData, null);
      }
    } else {
      setCustom(false);
      // console.log(tempData);
      if (filterBy === "true") {
        summarisedData(tempData, parseInt(filterDay));
      } else {
        detailedData(tempData, parseInt(filterDay));
      }
    }

    return () => {
      setData([]); // clean up
    };
  }, [filterDay, filterBy, ctx.copyData, tempData]);

  const detailedData = (data, filter) => {
    console.log("filter", filter);
    let dArr = [];
    let today = new Date().toString().substring(4, 15);
    let inArr = [];
    let outArr = [];
    data = JSON.parse(JSON.stringify(data));
    data.forEach((d) => {
      inArr.push(JSON.parse(JSON.stringify(d)));
      if (d.scanType === "out") {
        d.scanType = "out";
        d.remarks = d.remarksOut;
        d.addedBy = d.removedBy;
        d.dateAdded = d.dateRemoved;
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    console.log("o", outArr);
    inArr.forEach((d) => {
      if (d.scanType === "out") d.scanType = "in";
    });
    data = [];
    data = data.concat(inArr, outArr);
    data.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
      }

      if (filter === null) {
        dArr.push(d);
      } else {
        if (
          Math.floor(
            (new Date(today) - new Date(getDate2(d.dateAdded))) /
              (1000 * 60 * 60 * 24)
          ) <= filter
        ) {
          dArr.push(d);
        }
      }
    });

    dArr.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(a.dateAdded["seconds"]) - new Date(b.dateAdded["seconds"])
      );
    });

    dArr.forEach((d) => {
      addData(d);
    });
  };
  const summarisedData = (data, filter) => {
    console.log("summarised", filter);
    console.log("data", data);
    let arr = [];
    let today = new Date().toString().substring(4, 15);
    let inArr = [];
    let outArr = [];
    data = JSON.parse(JSON.stringify(data));
    data.forEach((d) => {
      inArr.push(JSON.parse(JSON.stringify(d)));
      if (d.scanType === "out") {
        if (d.remarksOut === undefined) {
          d.remarksOut = d.remarks;
        }
        if (d.removedBy === undefined) {
          d.removedBy = d.addedBy;
        }
        d.scanType = "out";
        d.remarks = d.remarksOut;
        d.addedBy = d.removedBy;
        d.dateAdded = d.dateRemoved;
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    console.log("o", outArr);
    inArr.forEach((d) => {
      if (d.scanType === "out") d.scanType = "in";
    });
    data = [];
    data = data.concat(inArr, outArr);
    data.forEach((d) => {
      if (filter === null) {
        if (
          !arr[
            getDate2(d.dateAdded) +
              "//" +
              d.prodID +
              "//" +
              d.prodName +
              "//" +
              d.batchNo +
              "//" +
              d.scanType +
              "//" +
              d.remarks +
              "//" +
              d.addedBy
          ]
        ) {
          arr[
            getDate2(d.dateAdded) +
              "//" +
              d.prodID +
              "//" +
              d.prodName +
              "//" +
              d.batchNo +
              "//" +
              d.scanType +
              "//" +
              d.remarks +
              "//" +
              d.addedBy
          ] = 1;
        } else {
          arr[
            getDate2(d.dateAdded) +
              "//" +
              d.prodID +
              "//" +
              d.prodName +
              "//" +
              d.batchNo +
              "//" +
              d.scanType +
              "//" +
              d.remarks +
              "//" +
              d.addedBy
          ] += 1;
        }
      } else {
        if (
          Math.floor(
            (new Date(today) - new Date(getDate2(d.dateAdded))) /
              (1000 * 60 * 60 * 24)
          ) <= filter
        ) {
          if (
            !arr[
              getDate2(d.dateAdded) +
                "//" +
                d.prodID +
                "//" +
                d.prodName +
                "//" +
                d.batchNo +
                "//" +
                d.scanType +
                "//" +
                d.remarks +
                "//" +
                d.addedBy
            ]
          ) {
            arr[
              getDate2(d.dateAdded) +
                "//" +
                d.prodID +
                "//" +
                d.prodName +
                "//" +
                d.batchNo +
                "//" +
                d.scanType +
                "//" +
                d.remarks +
                "//" +
                d.addedBy
            ] = 1;
          } else {
            arr[
              getDate2(d.dateAdded) +
                "//" +
                d.prodID +
                "//" +
                d.prodName +
                "//" +
                d.batchNo +
                "//" +
                d.scanType +
                "//" +
                d.remarks +
                "//" +
                d.addedBy
            ] += 1;
          }
        }
      }
    });
    let decodeArr = [];
    for (let i in arr) {
      let res = i.split("//");
      decodeArr.push({
        dateAdded: res[0],
        prodID: res[1],
        prodName: res[2],
        batchNo: res[3],
        scanType: res[4],
        remarks: res[5],
        addedBy: res[6],
        count: arr[i],
      });
    }

    decodeArr.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    setData(decodeArr);
  };
  const addData = (data) => {
    setData((prevData) => {
      return [data, ...prevData];
    });
  };
  const addTempData = (data) => {
    setTempData((prevData) => {
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

  const searchDate = () => {
    console.log("in 1");
    let dArr = [];
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);

    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }
    tempData.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
      }
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        dArr.push(d);
      }
    });

    dArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(dArr);
    setData(dArr);
  };
  const actionSearchDate = () => {
    console.log("in 2");
    let dArr = [];
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);

    let actionType = document.getElementById("actionSelect").value;
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }
    tempData.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
      }
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        if (d.scanType === actionType) {
          dArr.push(d);
        }
      }
    });

    dArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(dArr);
    setData(dArr);
  };

  const prodIDSearchDate = () => {
    console.log("in 3");
    let dArr = [];
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);

    let prodID = document.getElementById("actionSelect").value;
    console.log(prodID);
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }
    tempData.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
      }
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        if (d.prodID === prodID) {
          dArr.push(d);
        }
      }
    });

    dArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(dArr);
    setData(dArr);
  };

  const userSearchDate = () => {
    console.log("in 4");
    let dArr = [];
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);

    let userID = document.getElementById("userInput").value;
    console.log(userID);
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }
    tempData.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
        d.addedBy = d.removedBy;
      }
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        if (d.addedBy.toLowerCase().includes(userID.toLowerCase())) {
          dArr.push(d);
        }
      }
    });

    dArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(dArr);
    setData(dArr);
  };

  const batchSearchDate = () => {
    console.log("in 5");
    let dArr = [];
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);

    let batchNo = document.getElementById("batchInput").value;
    console.log(batchNo);
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }
    tempData.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
      }
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        if (d.batchNo.includes(batchNo)) {
          dArr.push(d);
        }
      }
    });

    dArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(dArr);
    setData(dArr);
  };

  const remarksSearchDate = () => {
    console.log("in 6");
    let dArr = [];
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);

    let remarks = document.getElementById("remarksInput").value;
    console.log(remarks);
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }
    tempData.forEach((d) => {
      if (d.dateRemoved !== "") {
        d.dateAdded = d.dateRemoved;
      }
      if (d.scanType === "out" && d.remarksOut) {
        d.remarks = d.remarksOut;
      }
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        if (d.remarks.toLowerCase().includes(remarks.toLowerCase())) {
          dArr.push(d);
        }
      }
    });

    dArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(dArr);
    setData(dArr);
  };

  const customFilter = (event) => {
    let filterBy = event.target.value;
    console.log(filterBy);
    document.getElementById("customInputs").innerHTML = "";
    const div = document.getElementById("customInputs");
    const searchBtn = document.createElement("button");
    const t = document.createElement("span");
    const dateFrom = document.createElement("input");
    const labelFrom = document.createElement("span");
    const dateTo = document.createElement("input");
    const labelTo = document.createElement("span");
    dateFrom.type = "date";
    dateTo.type = "date";
    labelFrom.className = classes.smallText;
    dateFrom.id = "dateFrom";
    labelTo.className = classes.smallText;
    dateTo.id = "dateTo";
    labelFrom.innerHTML = "From";
    labelTo.innerHTML = "To";

    if (filterBy === "date") {
      searchBtn.onclick = () => searchDate();
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "action") {
      const actionSelect = document.createElement("select");
      const actionValueIn = document.createElement("option");
      const actionValueOut = document.createElement("option");
      const labelAction = document.createElement("span");
      actionSelect.id = "actionSelect";
      actionSelect.name = "actionSelect";
      labelAction.innerHTML = "Action";
      labelAction.className = classes.smallText;
      actionValueIn.value = "in";
      actionValueIn.innerHTML = "In";
      actionValueOut.value = "out";
      actionValueOut.innerHTML = "Out";
      actionSelect.appendChild(actionValueIn);
      actionSelect.appendChild(actionValueOut);
      searchBtn.onclick = () => actionSearchDate();

      t.appendChild(labelAction);
      t.appendChild(actionSelect);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "prodID") {
      const actionSelect = document.createElement("select");
      const labelAction = document.createElement("span");
      actionSelect.id = "actionSelect";
      actionSelect.name = "actionSelect";
      labelAction.innerHTML = "Product ID";
      labelAction.className = classes.smallText;

      ctx.product.forEach((pdoc) => {
        const actionValue = document.createElement("option");
        actionValue.value = pdoc.prodID;
        actionValue.innerHTML = pdoc.prodID;
        actionSelect.appendChild(actionValue);
      });

      searchBtn.onclick = () => prodIDSearchDate();

      t.appendChild(labelAction);
      t.appendChild(actionSelect);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "user") {
      const userInput = document.createElement("input");
      const labelAction = document.createElement("span");
      userInput.id = "userInput";
      userInput.name = "userInput";
      labelAction.innerHTML = "User";
      labelAction.className = classes.smallText;

      searchBtn.onclick = () => userSearchDate();

      t.appendChild(labelAction);
      t.appendChild(userInput);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "batchNo") {
      const batchInput = document.createElement("input");
      const labelAction = document.createElement("span");
      batchInput.id = "batchInput";
      batchInput.name = "batchInput";
      labelAction.innerHTML = "Batch No";
      labelAction.className = classes.smallText;

      searchBtn.onclick = () => batchSearchDate();

      t.appendChild(labelAction);
      t.appendChild(batchInput);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "remarks") {
      const remarksInput = document.createElement("input");
      const labelAction = document.createElement("span");
      remarksInput.id = "remarksInput";
      remarksInput.name = "remarksInput";
      labelAction.innerHTML = "Remarks";
      labelAction.className = classes.smallText;

      searchBtn.onclick = () => remarksSearchDate();

      t.appendChild(labelAction);
      t.appendChild(remarksInput);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    }
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
          <option value="custom">Custom</option>
        </select>
        &nbsp; &nbsp;
        {custom ? (
          <React.Fragment>
            <select id="custom" name="custom" onChange={customFilter}>
              <option value="">Filter By</option>
              <option value="date">Date</option>
              <option value="prodID">Product ID</option>
              <option value="batchNo">Batch No</option>
              <option value="action">Action</option>
              <option value="user">User</option>
              <option value="remarks">Remarks</option>
            </select>
            &nbsp; &nbsp;
            <span id="customInputs"></span>
          </React.Fragment>
        ) : (
          <div></div>
        )}
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
            <option value={true}>Summarised</option>
            <option value={false}>Detailed</option>
          </select>
        </h1>
        <div className={classes.content}>
          <table className={classes.table}>
            <tbody>
              {filterBy === "false" ? (
                <tr>
                  <th>Date</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Batch No</th>
                  <th>Action</th>
                  <th>Remarks</th>
                  <th>User</th>
                </tr>
              ) : (
                <tr>
                  <th>Date</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Batch No</th>
                  <th>Amount</th>
                  <th>Action</th>
                  <th>Remarks</th>
                  <th>User</th>
                </tr>
              )}

              {data.map((entry) =>
                filterBy === "false" ? (
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
                ) : (
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
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scan;
