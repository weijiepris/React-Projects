import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./HomePage.module.css";
import AuthContext from "../store/auth-context";
// import { Link } from "react-router-dom";

import Bargraph from "./charts/Bargraph";
// import LineGraph from "./charts/Linegraph";

// import Chart from "react-google-charts";

import useContainerDimensions from "./Reusables/useContainerDimensions";
import TotalStockCount from "./charts/TotalStockCount";
import TimelineChart from "./charts/TimelineChart";

import { RiFilterLine } from "@react-icons/all-files/ri/RiFilterLine";
import { RiFilterOffLine } from "@react-icons/all-files/ri/RiFilterOffLine";
const HomePage = () => {
  const ctx = useContext(AuthContext);

  const flexContent = useRef();
  const { width, height } = useContainerDimensions(flexContent);

  const [currentInventory, setCurrentInventory] = useState([]);
  const [collapsedCurrentInventory, setCollapsedCurrentInventory] = useState(
    []
  );
  const [productSummary, setProductSummary] = useState([]);
  const [stockIn, setStockIn] = useState(0);
  const [stockOut, setStockOut] = useState(0);
  const [bargraph, setBargraph] = useState([]);
  const [linegraph, setLinegraph] = useState([]);
  // const [summary, setSummary] = useState([]);
  const [graph, setGraph] = useState("TotalStock");
  const [panel, setPanel] = useState("currentInventory");
  const [cic, setcic] = useState(false);

  const getBargraph = () => {
    return bargraph;
  };

  const getLinegraph = () => {
    return linegraph;
  };

  const test = (event) => {
    setGraph(event.target.value);
  };

  const test2 = (event) => {
    setPanel(event.target.value);
  };

  useEffect(() => {
    let stockOutCounter = 0;
    let stockInCounter = 0;

    // loop into ctx batch
    ctx.batch.forEach((doc) => {
      // count all stock out
      if (doc.scanType === "out") {
        stockOutCounter++;
      }
      // count all stock in
      if (doc.scanType === "in") {
        stockInCounter++;
      }
    });

    setStockOut(stockOutCounter);
    setStockIn(stockInCounter);

    let prodArr = [];
    let currentArr = [];
    let currentArrCollapsed = [];
    let barGraphArr = [];

    ctx.product.forEach((pdoc) => {
      if (!prodArr[pdoc.name + "//" + pdoc.color]) {
        prodArr[pdoc.name + "//" + pdoc.color] = 0;
      }

      ctx.batch.forEach((bdoc) => {
        if (bdoc.prodID === pdoc.id && bdoc.scanType === "in") {
          if (
            !currentArr[
              bdoc.prodID +
                "//" +
                bdoc.batchNo +
                "//" +
                bdoc.prodName +
                "//" +
                getDate(bdoc.dateAdded)
            ]
          ) {
            currentArr[
              bdoc.prodID +
                "//" +
                bdoc.batchNo +
                "//" +
                bdoc.prodName +
                "//" +
                getDate(bdoc.dateAdded)
            ] = 1;
          } else {
            currentArr[
              bdoc.prodID +
                "//" +
                bdoc.batchNo +
                "//" +
                bdoc.prodName +
                "//" +
                getDate(bdoc.dateAdded)
            ] += 1;
          }

          if (!currentArrCollapsed[bdoc.prodID + "//" + bdoc.prodName]) {
            currentArrCollapsed[bdoc.prodID + "//" + bdoc.prodName] = 1;
          } else {
            currentArrCollapsed[bdoc.prodID + "//" + bdoc.prodName] += 1;
          }
          // find all available product name and count them into array
          prodArr[bdoc.prodName + "//" + pdoc.color] += 1;
        }
      });

      setCurrentInv(currentArr);
      setCollapsedCurrentInv(currentArrCollapsed);
    });

    // to set bargraph
    // default if dataset is empty
    barGraphArr[0] = ["Element", "In stock", { role: "style" }];
    barGraphArr[1] = ["No Data Found", 0, "transparent"];
    let c = 1;
    for (let i in prodArr) {
      if (prodArr[i] > 0) {
        let res = i.split("//");
        barGraphArr[c] = [
          res[0],
          prodArr[i],
          "stroke-color: black; stroke-width: 2; fill-color:" +
            res[1] +
            "; opacity:0.8;",
        ];
        c++;
      }
    }
    setBargraph(barGraphArr);

    let arr = [];
    let testing = [];
    let temp2 = [];
    ctx.batch.forEach((bdoc) => {
      const dt = bdoc.prodID;
      if (!arr[dt]) {
        arr[dt] = 1;
      } else {
        arr[dt] += 1;
      }
      if (bdoc.scanType === "in") {
        const dt2 = getDate(bdoc.dateAdded);
        if (!testing[dt2]) {
          testing[dt2] = 1;
        } else {
          testing[dt2] += 1;
        }
      }
    });

    let op = [];
    c = 1;
    temp2[0] = ["Date", "Scan in"];
    temp2[1] = ["No Data Found", 0];
    for (const value in testing) {
      op = [
        ...op,
        {
          x: new Date(value),
          y: testing[value],
        },
      ];

      temp2[c] = [new Date(value).toString().substring(4, 15), testing[value]];
      c++;
    }
    temp2.sort(function (a, b) {
      return new Date(a[0]) - new Date(b[0]);
    });

    setLinegraph(temp2);

    // console.log("testing => ", arr);

    let productSummaryArr = [];
    ctx.batch.forEach((bdoc) => {
      if (
        !productSummaryArr[
          bdoc.prodID +
            "//" +
            bdoc.batchNo +
            "//" +
            bdoc.prodName +
            "//" +
            getDate(bdoc.dateAdded)
        ]
      ) {
        productSummaryArr[
          bdoc.prodID +
            "//" +
            bdoc.batchNo +
            "//" +
            bdoc.prodName +
            "//" +
            getDate(bdoc.dateAdded)
        ] = 1;
      } else {
        productSummaryArr[
          bdoc.prodID +
            "//" +
            bdoc.batchNo +
            "//" +
            bdoc.prodName +
            "//" +
            getDate(bdoc.dateAdded)
        ] += 1;
      }
    });
    setProductSumm(productSummaryArr);
    return () => {};
    // console.log(summary);
  }, [ctx.product, ctx.batch]);

  const setProductSumm = (productSummaryArr) => {
    let arr = [];
    let c = 0;
    for (let i in productSummaryArr) {
      let res = i.split("//");
      arr[c] = {
        prodID: res[0],
        batchNo: res[1],
        prodName: res[2],
        quantity: productSummaryArr[i],
        dateAdded: res[3],
      };
      c++;
    }

    arr.sort(function (a, b) {
      var textA = a.batchNo;
      var textB = b.batchNo;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    arr.sort(function (a, b) {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
    setProductSummary(arr);
  };

  const setCurrentInv = (currentArr) => {
    // console.log(currentArr);
    let arr = [];
    let c = 0;
    for (let i in currentArr) {
      let res = i.split("//");
      arr[c] = {
        prodID: res[0],
        batchNo: res[1],
        prodName: res[2],
        quantity: currentArr[i],
        dateAdded: res[3],
      };
      c++;
    }
    arr.sort(function (a, b) {
      var textA = a.batchNo.toUpperCase();
      var textB = b.batchNo.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    arr.sort(function (a, b) {
      var textA = a.prodID.toUpperCase();
      var textB = b.prodID.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    setCurrentInventory(arr);
  };

  const setCollapsedCurrentInv = (collapsedCurrentArr) => {
    // console.log(collapsedCurrentArr);
    let arr = [];
    let c = 0;
    for (let i in collapsedCurrentArr) {
      let res = i.split("//");
      // console.log(res[0], " - ", res[1], " - ", res[2], " - ", currentArr[i]);
      arr[c] = {
        prodID: res[0],
        prodName: res[1],
        quantity: collapsedCurrentArr[i],
      };
      c++;
    }

    arr.sort(function (a, b) {
      var textA = a.prodID.toUpperCase();
      var textB = b.prodID.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    setCollapsedCurrentInventory(arr);
  };

  const getDate = (date) => {
    if (date === null) {
      return 0;
    } else {
      return new Date(date["seconds"] * 1000).toString().substring(4, 15);
    }
  };

  const ProdSummary = () => {
    return (
      <React.Fragment>
        <table className={classes.table}>
          <tbody>
            {productSummary.map((list) => (
              <tr key={Math.random()}>
                <td>{list.dateAdded}</td>
                <td>{list.batchNo}</td>
                <td>{list.prodID}</td>
                <td>{list.prodName}</td>
                <td>{list.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  const currInvHandler = (event) => {
    setcic(!cic);
  };
  const CurrentInventory = () => {
    return (
      <React.Fragment>
        <table className={classes.table}>
          {!cic
            ? currentInventory.map((list) => (
                <tr key={Math.random()}>
                  <td>{list.prodID}</td>
                  <td>{list.prodName}</td>
                  <td>{list.batchNo}</td>
                  <td>{list.quantity}</td>
                  <td>{list.dateAdded}</td>
                </tr>
              ))
            : collapsedCurrentInventory.map((list) => (
                <tr key={Math.random()}>
                  <td>{list.prodID}</td>
                  <td>{list.prodName}</td>
                  <td>{list.quantity}</td>
                </tr>
              ))}
        </table>
      </React.Fragment>
    );
  };
  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Overview Dashboard</span>
      <br />

      <div className={classes.wrapper}>
        <br />
        <div className={classes.individual}>
          Total products
          <span className={classes.quantity}>{ctx.product.length}</span>
        </div>
        <div className={classes.individual}>
          Current stocks
          <span className={classes.quantity}>{stockIn}</span>
        </div>
        <div className={classes.individual}>
          Total in
          <span className={classes.quantity}>{ctx.batch.length}</span>
        </div>
        <div className={classes.individual}>
          Total out
          <span className={classes.quantity}>{stockOut}</span>
        </div>
      </div>
      <br />

      <div className={classes.wrapper}>
        <div className={classes.flex}>
          <div className={classes.flexContent}>
            <br />
            <select
              id="leftPanel"
              name="leftPanel"
              onChange={test2}
              className={classes.input}
            >
              <option value="currentInventory">Current Inventory</option>
              <option value="prodSummary">Production Summary</option>
            </select>

            {panel === "prodSummary" ? (
              <React.Fragment>
                <h1>Production Summary</h1>
                <table className={classes.tableMain}>
                  <tbody>
                    <tr>
                      <th>Date produced</th>
                      <th>Batch No</th>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Total produced</th>
                    </tr>
                  </tbody>
                </table>
                <div className={classes.overflowBox}>
                  <ProdSummary />
                </div>
              </React.Fragment>
            ) : panel === "currentInventory" ? (
              <React.Fragment>
                <h1>
                  Current Inventory{" "}
                  {!cic ? (
                    <RiFilterOffLine
                      value={true}
                      onClick={currInvHandler}
                      size={30}
                      className={classes.hover}
                    />
                  ) : (
                    <RiFilterLine
                      value={true}
                      onClick={currInvHandler}
                      size={30}
                      className={classes.hover}
                    />
                  )}
                </h1>
                <table className={classes.tableMain}>
                  {!cic ? (
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Batch Number</th>
                      <th>Quantity</th>
                      <th>Date Bottled</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                    </tr>
                  )}
                </table>
                <div className={classes.overflowBox}>
                  <CurrentInventory />
                </div>
              </React.Fragment>
            ) : (
              <div>test</div>
            )}
          </div>
          <div className={classes.flexContent} ref={flexContent}>
            <br />
            <select
              id="charts"
              name="charts"
              onChange={test}
              className={classes.input}
            >
              <option value="TotalStock">Total stock count</option>
              <option value="Timeline">Input Timeline</option>
              <option value="ScanOut1">Scan outs</option>
            </select>
            {graph === "TotalStock" ? (
              <TotalStockCount
                width={width}
                height={height}
                data={getBargraph()}
              />
            ) : graph === "Timeline" ? (
              <TimelineChart
                width={width}
                height={height}
                data={getLinegraph()}
              />
            ) : graph === "ScanOut" ? (
              <Bargraph options={[]} />
            ) : (
              <Bargraph options={[]} />
            )}
          </div>
        </div>
      </div>
      <br></br>

      {/* {ctx.currentUser.userRole === "developer" ? (
        <div className={classes.actions}>
          <br></br>
          <Link to="/admin">
            <button>Welcome admin</button>
          </Link>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default HomePage;
