import React, { useState, useEffect, useContext, useRef } from "react";
import firebase from "firebase";
import classes from "./HomePage.module.css";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";

import Bargraph from "./charts/Bargraph";
// import LineGraph from "./charts/Linegraph";

// import Chart from "react-google-charts";

import useContainerDimensions from "./Reusables/useContainerDimensions";
import TotalStockCount from "./charts/TotalStockCount";
import TimelineChart from "./charts/TimelineChart";

const HomePage = () => {
  const ctx = useContext(AuthContext);

  const flexContent = useRef();
  const { width, height } = useContainerDimensions(flexContent);

  const userid = firebase.auth().currentUser.uid;
  const [currentInventory, setCurrentInventory] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [bargraph, setBargraph] = useState([]);
  const [linegraph, setLinegraph] = useState([]);
  const [summary, setSummary] = useState([]);
  const [graph, setGraph] = useState("TotalStock");
  const [panel, setPanel] = useState("currentInventory");

  const getBargraph = () => {
    return bargraph;
  };
  const getLinegraph = () => {
    return linegraph;
  };
  const addCurrentInventory = (list) => {
    setCurrentInventory((prevList) => {
      return [list, ...prevList];
    });
  };
  const test = (event) => {
    setGraph(event.target.value);
  };
  const test2 = (event) => {
    setPanel(event.target.value);
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .orderBy("serialno", "asc")
      .get()
      .then((snapshot) => {
        let tempQuantity = 0;
        if (snapshot.docs.length) {
          let temp2 = [];
          let c = 1;
          snapshot.forEach((doc) => {
            console.log(doc.data());
            let tempQ = 0;
            firebase
              .firestore()
              .collection("batch")
              .doc(ctx.currentUser.companyName)
              .collection("prodID")
              .doc(doc.data().id)
              .collection("batchNo")
              .orderBy("quantity", "asc")
              .get()
              .then((snapshot) => {
                if (snapshot.docs.length) {
                  snapshot.forEach((docs) => {
                    if (docs.data().quantity > 0) {
                      // console.log("t =>", docs.data());

                      let r = [];
                      r = {
                        prodID: doc.data().id,
                        quantity: docs.data().quantity,
                        batchNo: docs.data().batchNo,
                        prodName: docs.data().prodName,
                        dateAdded: docs.data().dateAdded,
                      };
                      addCurrentInventory(r);
                      tempQ += docs.data().quantity;
                    }
                  });
                }
              })
              .then(function () {
                tempQuantity += tempQ;
              })
              .then(function () {
                temp2[0] = ["Element", "In stock", { role: "style" }];
                temp2[c] = [
                  doc.data().name,
                  tempQ,
                  "stroke-color: black;stroke-width: 2; fill-color:" +
                    doc.data().color +
                    ";",
                ];
                setStockQuantity(tempQuantity);
                setQuantity(snapshot.docs.length);
                setBargraph(temp2);
                c++;
              });
          });
        }
      });

    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .where("scanType", "==", "in")
      .orderBy("dateAdded", "asc")
      .get()
      .then((snapshot) => {
        let arr = [];
        let testing = [];
        let temp2 = [];
        snapshot.forEach((doc) => {
          const dt = doc.data().prodID;
          const dt2 = getDate(doc.data().dateAdded["seconds"]);
          if (!arr[dt]) {
            arr[dt] = 1;
          } else {
            arr[dt] += 1;
          }

          if (!testing[dt2]) {
            testing[dt2] = 1;
          } else {
            testing[dt2] += 1;
          }
        });

        let op = [];
        let c = 1;
        for (const value in testing) {
          op = [
            ...op,
            {
              x: new Date(value),
              y: testing[value],
            },
          ];

          temp2[0] = ["Date", "Scan in"];
          temp2[c] = [
            new Date(value).toString().substring(4, 15),
            testing[value],
          ];
          c++;
        }

        setLinegraph(temp2);

        // console.log("testing => ", arr);
        for (const t in arr) {
          firebase
            .firestore()
            .collection("batch")
            .doc(ctx.currentUser.companyName)
            .collection("products")
            .where("prodID", "==", t)
            .where("scanType", "==", "in")
            .orderBy("dateAdded", "desc")
            .get()
            .then((snapshot) => {
              let arr2 = [];
              let c = 0;
              snapshot.forEach((doc) => {
                // console.log("d = ", doc.data());
                const dt = getDate(doc.data().dateAdded["seconds"]);
                if (!arr2[c]) {
                  arr2[c] = {
                    count: 1,
                    date: dt,
                    prodID: t,
                    prodName: doc.data().prodName,
                  };
                } else {
                  if (arr2.prodID === t) {
                    for (const d in arr2) {
                      if (arr2[d].count) {
                        arr2[d].count++;
                      }
                    }
                  }
                }
                c++;
              });
              let v = {};
              v["data"] = arr2;
              addSummary(v);
            });
        }
      });

    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .where("scanType", "==", "out")
      .orderBy("dateAdded", "desc")
      .get()
      .then((snapshot) => {
        let arr2 = [];
        let c = 0;
        snapshot.forEach((doc) => {});
      });

    return () => {
      console.log("cleanup");
    };
    // console.log(summary);
  }, [userid, ctx.currentUser.companyName]);

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(4, 15);
  };

  const getExpire = (date) => {
    let d = new Date(date * 1000);

    d.setDate(d.getDate() + 60);

    return d.toString().substring(4, 15);
  };

  const addSummary = (list) => {
    setSummary((prevList) => {
      return [list, ...prevList];
    });
  };

  const getSummary = () => {
    const result = [];
    // console.log("summary => ", summary);
    summary.forEach((d) => {
      // console.log(d);
      let dates = new Set(d.data.map((prod) => prod.date));
      dates.forEach((date) => {
        result.push({
          date: date,
          prodID: d.data[0].prodID,
          count: d.data.filter((prod) => prod.date === date).length,
          prodName: d.data[0].prodName,
        });
      });
    });
    // console.log(result);

    // setOverall(result);.
    result.sort(function (a, b) {
      var textA = a.prodID.toUpperCase();
      var textB = b.prodID.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    result.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });

    return result;
  };

  const ProdSummary = () => {
    return (
      <React.Fragment>
        <h1>Production Summary</h1>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Date produced</th>
              <th>Amount</th>
            </tr>
            {getSummary().map((list) => (
              <tr key={Math.random()}>
                <td>{list.prodID}</td>
                <td>{list.prodName}</td>
                <td>{list.date}</td>
                <td>{list.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  const CurrentInventory = () => {
    // var byDate = currentInventory.slice(0);
    // byDate.sort(function (a, b) {
    //   return b.quantity - a.quantity;
    // });

    // console.log("ci => ", currentInventory);
    return (
      <React.Fragment>
        <h1>Current Inventory</h1>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Batch Number</th>
              <th>Quantity</th>
              <th>Date Produced</th>
              <th>Expiry Date</th>
            </tr>
            {currentInventory.map((list) => (
              <tr key={Math.random()}>
                <td>{list.prodName}</td>
                <td>{list.prodID}</td>
                <td>{list.batchNo}</td>
                <td>{list.quantity}</td>
                <td>{getDate(list.dateAdded["seconds"])}</td>
                <td>{getExpire(list.dateAdded["seconds"])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  // if (!isLoaded) {
  //   return (
  //     <div className={classes.container}>
  //       <h1>Loading . . . </h1>
  //     </div>
  //   );
  // }

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>
        Overview Dashboard
        <select id="charts" name="charts">
          <option value="default">All Time</option>
          <option value="30">Last 30 Days</option>
          <option value="7">Last 7 Days</option>
        </select>
      </span>
      <br />

      <div className={classes.wrapper}>
        <br />
        <div className={classes.individual}>
          Total products created
          <span className={classes.quantity}>{quantity}</span>
        </div>
        <div className={classes.individual}>
          Total stock count
          <span className={classes.quantity}>{stockQuantity}</span>
        </div>
      </div>
      <br />

      <div className={classes.wrapper}>
        <div className={classes.flex}>
          <div className={classes.flexContent}>
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
              <ProdSummary />
            ) : panel === "currentInventory" ? (
              <CurrentInventory />
            ) : (
              <div>test</div>
            )}
          </div>
          <div className={classes.flexContent} ref={flexContent}>
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
