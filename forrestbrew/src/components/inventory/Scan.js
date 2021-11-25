import React, { useState, useEffect, useContext } from "react";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const Scan = (props) => {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState("");
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
  }, [filterDay, filterBy, ctx.copyData, tempData, filterData]);

  const detailedData = (data, filter) => {
    data = JSON.parse(JSON.stringify(data));

    if (filter === null) {
      if (filterData === "") {
        setData([]);
      } else {
        data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (
            new Date(a.dateAdded["seconds"]) - new Date(b.dateAdded["seconds"])
          );
        });
        data.forEach((d) => {
          addData(d);
        });
      }
    } else {
      // console.log("detailed data", data);
      let inArr = [];
      let outArr = [];
      let newData = [];
      let today = new Date().toString().substring(4, 15);

      data.forEach((d) => {
        if (
          Math.floor(
            (new Date(today) - new Date(getDate2(d.dateAdded))) /
              (1000 * 60 * 60 * 24)
          ) <= filter
        ) {
          inArr.push(JSON.parse(JSON.stringify(d)));
        }

        if (
          Math.floor(
            (new Date(today) - new Date(getDate2(d.dateRemoved))) /
              (1000 * 60 * 60 * 24)
          ) <= filter
        ) {
          outArr.push(JSON.parse(JSON.stringify(d)));
        }
      });

      inArr.forEach((d) => {
        d.scanType = "in";
      });
      outArr.forEach((d) => {
        d.remarks = d.remarksOut;
        d.addedBy = d.removedBy;
        d.dateAdded = d.dateRemoved;
      });
      newData = newData.concat(inArr, outArr);

      newData.sort(function (a, b) {
        return (
          new Date(b.dateAdded["seconds"]) - new Date(a.dateAdded["seconds"])
        );
      });
      setData(newData);
    }
  };

  const summarisedData = (data, filter) => {
    data = JSON.parse(JSON.stringify(data));

    let arr = [];
    let inArr = [];
    let outArr = [];
    let newData = [];
    let today = new Date().toString().substring(4, 15);

    if (filter === null) {
      if (filterData === "") {
        setData([]);
      } else {
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
      }
    } else {
      data.forEach((d) => {
        if (
          Math.floor(
            (new Date(today) - new Date(getDate2(d.dateAdded))) /
              (1000 * 60 * 60 * 24)
          ) <= filter
        ) {
          inArr.push(JSON.parse(JSON.stringify(d)));
        }

        if (
          Math.floor(
            (new Date(today) - new Date(getDate2(d.dateRemoved))) /
              (1000 * 60 * 60 * 24)
          ) <= filter
        ) {
          outArr.push(JSON.parse(JSON.stringify(d)));
        }
      });
      inArr.forEach((d) => {
        d.scanType = "in";
      });
      outArr.forEach((d) => {
        d.remarks = d.remarksOut;
        d.addedBy = d.removedBy;
        d.dateAdded = d.dateRemoved;
      });
      newData = newData.concat(inArr, outArr);
      newData.forEach((d) => {
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
    }
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
    let dArr = [];
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
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

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    newArr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(newArr);
    setData(newArr);
  };

  const actionSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
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

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (d.scanType === actionType) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const prodIDSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);
    let prodID = document.getElementById("actionSelect").value;

    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (d.prodID === prodID) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const userSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);
    let userID = document.getElementById("userInput").value;

    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (
        d.addedBy
          .toString()
          .toLowerCase()
          .includes(userID.toString().toLowerCase())
      ) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const batchSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);
    let batchNo = document.getElementById("batchInput").value;

    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (d.batchNo.includes(batchNo)) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const remarksSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);
    let remarks = document.getElementById("remarksInput").value;

    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (
        d.remarks
          .toString()
          .toLowerCase()
          .includes(remarks.toString().toLowerCase())
      ) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const prodIDActionSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);
    let prodID = document.getElementById("productSelect").value;
    let actionType = document.getElementById("actionSelect").value;

    console.log("prodID", prodID);
    console.log("actionType", actionType);
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (d.prodID === prodID && d.scanType === actionType) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const batchNoActionSearchDate = () => {
    let inArr = [];
    let outArr = [];
    let newArr = [];
    let data = JSON.parse(JSON.stringify(tempData));
    let fromDate = new Date(document.getElementById("dateFrom").value)
      .toString()
      .substring(4, 15);
    let toDate = new Date(document.getElementById("dateTo").value)
      .toString()
      .substring(4, 15);
    let batchNo = document.getElementById("batchInput").value;
    let actionType = document.getElementById("actionSelect").value;

    console.log("batchNo", batchNo);
    console.log("actionType", actionType);
    if (fromDate === "lid Date") {
      fromDate = new Date("2000/01/01");
    }
    if (toDate === "lid Date") {
      toDate = new Date().toString().substring(4, 15);
    }

    data.forEach((d) => {
      if (
        new Date(getDate2(d.dateAdded)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateAdded)) <= new Date(toDate)
      ) {
        inArr.push(JSON.parse(JSON.stringify(d)));
      }
      if (
        new Date(getDate2(d.dateRemoved)) >= new Date(fromDate) &&
        new Date(getDate2(d.dateRemoved)) <= new Date(toDate)
      ) {
        outArr.push(JSON.parse(JSON.stringify(d)));
      }
    });
    inArr.forEach((d) => {
      d.scanType = "in";
    });

    outArr.forEach((d) => {
      if (d.remarksOut !== undefined) {
        d.remarks = d.remarksOut;
      }
      if (d.removedBy !== undefined) {
        d.addedBy = d.removedBy;
      }
      d.dateAdded = d.dateRemoved;
    });

    newArr = newArr.concat(inArr, outArr);
    let arr = [];
    newArr.forEach((d) => {
      if (
        d.batchNo
          .toString()
          .toLowerCase()
          .includes(batchNo.toString().toLowerCase()) &&
        d.scanType === actionType
      ) {
        arr.push(d);
      }
    });
    arr.sort(function (a, b) {
      return new Date(getDate2(b.dateAdded)) - new Date(getDate2(a.dateAdded));
    });
    document.getElementById("detail").value = "false";
    setFilterBy(false);
    setCustomData(arr);
    setData(arr);
  };

  const customFilter = (event) => {
    let filterBy = event.target.value;
    setFilterData(filterBy);
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
      // searchBtn.onclick = () => searchDate();
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.onsubmit = (event) => {
        event.preventDefault();
        searchDate();
      };
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
      // searchBtn.onclick = () => actionSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        actionSearchDate();
      };

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

      // searchBtn.onclick = () => prodIDSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        prodIDSearchDate();
      };
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

      // searchBtn.onclick = () => userSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        userSearchDate();
      };
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

      // searchBtn.onclick = () => batchSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        batchSearchDate();
      };
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

      // searchBtn.onclick = () => remarksSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        remarksSearchDate();
      };
      t.appendChild(labelAction);
      t.appendChild(remarksInput);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "prodIDAction") {
      const productSelect = document.createElement("select");
      const labelProduct = document.createElement("span");
      productSelect.id = "productSelect";
      productSelect.name = "productSelect";
      labelProduct.innerHTML = "Product ID";
      labelProduct.className = classes.smallText;

      ctx.product.forEach((pdoc) => {
        const productValue = document.createElement("option");
        productValue.value = pdoc.prodID;
        productValue.innerHTML = pdoc.prodID;
        productSelect.appendChild(productValue);
      });

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

      // searchBtn.onclick = () => prodIDSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        prodIDActionSearchDate();
      };
      t.appendChild(labelProduct);
      t.appendChild(productSelect);
      t.appendChild(labelAction);
      t.appendChild(actionSelect);
      t.appendChild(labelFrom);
      t.appendChild(dateFrom);
      t.appendChild(labelTo);
      t.appendChild(dateTo);
      searchBtn.innerHTML = "Search";
      div.append(t);
      div.append(searchBtn);
    } else if (filterBy === "batchNoAction") {
      const batchInput = document.createElement("input");
      const labelBatch = document.createElement("span");
      batchInput.id = "batchInput";
      batchInput.name = "batchInput";
      labelBatch.innerHTML = "Batch No";
      labelBatch.className = classes.smallText;

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

      // searchBtn.onclick = () => prodIDSearchDate();

      div.onsubmit = (event) => {
        event.preventDefault();
        batchNoActionSearchDate();
      };

      t.appendChild(labelBatch);
      t.appendChild(batchInput);
      t.appendChild(labelAction);
      t.appendChild(actionSelect);
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
              <option value="prodIDAction">Product ID &amp; Action</option>
              <option value="batchNoAction">Batch No &amp; Action</option>
            </select>
            &nbsp; &nbsp;
            <form id="customInputs" className={classes.formInput}></form>
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
