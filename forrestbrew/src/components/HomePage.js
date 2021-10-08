import React, { useState, useEffect, useContext, useRef } from "react";
import firebase from "firebase";
import classes from "./HomePage.module.css";
import AuthContext from "../store/auth-context";

import Bargraph from "./charts/Bargraph";
import LineGraph from "./charts/Linegraph";

import Chart from "react-google-charts";

import useContainerDimensions from "./Reusables/useContainerDimensions";
import TotalStockCount from "./charts/TotalStockCount";

const HomePage = () => {
  const ctx = useContext(AuthContext);

  const flexContent = useRef();
  const { width, height } = useContainerDimensions(flexContent);

  // const [user, setUser] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  const [currentInventory, setCurrentInventory] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [options, setOptions] = useState({});
  const [line, setLine] = useState({});
  const [temp, setTemp] = useState([]);
  const [summary, setSummary] = useState([]);
  // const [category, setCategory] = useState("");
  const [graph, setGraph] = useState("TotalStock");
  const [panel, setPanel] = useState("currentInventory");

  const drawChart = (dataPoints) => {
    const options = {
      animationEnabled: true,
      title: {
        text: "Total Stock Count",
      },
      axisX: {
        title: "Flavours",
      },
      axisY: {
        title: "Quantity",
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          dataPoints: dataPoints,
        },
      ],
    };

    setOptions(options);
  };
  const tempChart = (dataPoints) => {
    setTemp(dataPoints);
  };

  const lineChart = (dataPoints) => {
    const options = {
      animationEnabled: true,
      title: {
        text: "Input dates",
      },
      axisX: {
        valueFormatString: "DD MMM YYYY",
      },
      axisY: {
        title: "Quantity",
      },
      legend: {
        cursor: "pointer",
        fontSize: 18,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          name: "Inputs",
          type: "line",
          showInLegend: true,
          dataPoints: dataPoints,
        },
      ],
    };
    setLine(options);
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
      .collection("users")
      .doc(userid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // setUser(snapshot.data());
          // setIsLoaded(true);
        } else {
          console.log("user does not exist");
        }
      });

    // console.log("company => ", ctx.currentUser.companyName);

    firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .orderBy("serialno", "desc")
      .get()
      .then((snapshot) => {
        // console.log("testing => ", snapshot.docs);
        let tempQuantity = 0;
        if (snapshot.docs.length) {
          let temp = [];
          let temp2 = [];
          let c = 1;
          snapshot.forEach((doc) => {
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
                      let r = [];
                      r = {
                        prodID: doc.data().id,
                        quantity: docs.data().quantity,
                        batchNo: docs.data().batchNo,
                        prodName: docs.data().prodName,
                        dateAdded: docs.data().dateAdded,
                      };
                      addCurrentInventory(r);
                    }
                  });
                }
              });

            tempQuantity += doc.data().quantity;
            temp = [
              ...temp,
              {
                label: doc.data().name,
                y: doc.data().quantity,
                color: doc.data().color,
              },
            ];
            temp2[0] = ["Element", "Density", { role: "style" }];
            temp2[c] = [doc.data().name, doc.data().quantity, doc.data().color];
            c++;
          });
          // console.log(tempQuantity);
          setQuantity(snapshot.docs.length);
          setStockQuantity(tempQuantity);
          drawChart(temp);
          tempChart(temp2);
        }
      });

    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .where("scanType", "==", "in")
      .orderBy("dateAdded", "desc")
      .get()
      .then((snapshot) => {
        let testing = [];
        snapshot.forEach((doc) => {
          const dt = getDate(doc.data().dateAdded["seconds"]);
          if (!testing[dt]) {
            testing[dt] = 1;
          } else {
            testing[dt] += 1;
          }
        });
        // console.log(testing);
        let op = [];
        for (const value in testing) {
          op = [
            ...op,
            {
              x: new Date(value),
              y: testing[value],
            },
          ];
        }
        lineChart(op);
      });

    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .where("scanType", "==", "in")
      .get()
      .then((snapshot) => {
        let arr = [];
        snapshot.forEach((doc) => {
          const dt = doc.data().prodID;
          if (!arr[dt]) {
            arr[dt] = 1;
          } else {
            arr[dt] += 1;
          }
        });

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
  // const getCategory = () => {
  //   const data = inventory;
  //   const unique = [...new Set(data.map((item) => item.category))];
  //   return unique;
  // };

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

    console.log("ci => ", currentInventory);
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
              <TotalStockCount width={width} height={height} data={temp} />
            ) : graph === "Timeline" ? (
              <LineGraph options={line} />
            ) : graph === "ScanOut" ? (
              <Bargraph options={options} />
            ) : (
              <Bargraph options={options} />
            )}
          </div>
        </div>
      </div>
      <br></br>

      {/* {user.userRole === "admin" ? (
  <div className={classes.actions}>
    <br></br>
    <Link
      to={{
        pathname: "/admin",
        state: user,
      }}
    >
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
