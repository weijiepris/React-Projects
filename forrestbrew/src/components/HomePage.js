import { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import classes from "../components/auth/Login.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const HomePage = () => {
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  const [inventory, setInventory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [options, setOptions] = useState({});

  const drawChart = (dataPoints) => {
    const options = {
      title: {
        text: "Stock Count",
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

  const addInventory = (list) => {
    setInventory((prevList) => {
      return [list, ...prevList];
    });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
          setIsLoaded(true);
        } else {
          console.log("user does not exist");
        }
      });

    console.log("company => ", ctx.currentUser.companyName);

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
          snapshot.forEach((doc) => {
            addInventory(doc.data());
            tempQuantity += doc.data().quantity;
            temp = [
              ...temp,
              {
                label: doc.data().name,
                y: doc.data().quantity,
                color: doc.data().color,
              },
            ];
          });
          console.log(tempQuantity);
          setQuantity(tempQuantity);
          drawChart(temp);
        }
      });

    // firebase
    //   .firestore()
    //   .collection("batch")
    //   .doc(ctx.currentUser.companyName)
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //     // console.log("testing => ", snapshot.docs);
    //     if (snapshot.docs.length) {
    //       snapshot.forEach((doc) => {
    //         // addInventory(doc.data());
    //         console.log(doc.data());
    //         // console.log(doc.data());
    //       });
    //     } else {
    //       console.log("no data found");
    //       // setDataExists(false);
    //     }
    //     // setIsLoaded(true);
    //   });

    // firebase
    //   .firestore()
    //   .collection("companies")
    //   .doc(ctx.currentUser.companyName)
    //   .collection("product")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot.docs);
    //     snapshot.docs.forEach((doc) => {
    //       console.log("data => ", doc);
    //     });
    //   });
    // firebase
    //   .firestore()
    //   .collection("companies")
    //   .doc(ctx.currentUser.companyName)
    //   .collection("product")
    //   .doc("000")
    //   .collection("data")
    //   .get()
    //   .then((snapshot) => {
    //     let temp = [];
    //     console.log("Total stocks for product ID 000 => ", snapshot.size);
    //     snapshot.docs.forEach((doc) => {
    //       temp.push(doc.data());
    //     });
    //     updateBatch(findOcc(temp, "batchNo"));
    //   })
    //   .then(function () {
    //     setIsLoaded(true);
    //   });

    // firebase
    //   .firestore()
    //   .collection("companies")
    //   .doc(ctx.currentUser.companyName)
    //   .collection("product")
    //   .doc("000")
    //   .collection("data")
    //   .where("batchNo", "==", "000")
    //   .get()
    //   .then((snapshot) => {
    //     // snapshot.docs.forEach((doc) => {
    //       console.log("data => ", snapshot.size);
    //     // });
    //   });

    // return () => {
    //   console.log("cleanup");
    // };
  }, [userid, ctx.currentUser.companyName]);

  if (!isLoaded) {
    return (
      <section className={classes.auth}>
        <h1>Loading . . . </h1>
      </section>
    );
  }

  return (
    <section className={classes.auth}>
      <h1>Welcome, {ctx.currentUser.name}</h1>
      <br></br>

      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>

      {/* {batch[0].map((entry) => (
        <ul key={entry.batchNo}>
          <li>
            batch {entry.batchNo} count = {entry.occurrence}
          </li>
        </ul>
      ))} */}

      {/* {user.companyID === "" ? (
        <div></div>
      ) : (
        <li>Total stock count {quantity}</li>
        // inventory.map((entry) => <li>Total stock count {quantity}</li>)
      )} */}

      {user.companyID === "" ? (
        <div>Company details not found</div>
      ) : (
        <div className={classes.container}>
          <table>
            <tbody>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
              {inventory.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className={classes.actions}>
            <Link to="/viewInventory">
              <button>View Inventory</button>
            </Link>
          </div> */}
        </div>
      )}

      {user.userRole === "admin" ? (
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
      )}
    </section>
  );
};

export default HomePage;
