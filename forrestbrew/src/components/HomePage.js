import { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import classes from "./HomePage.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

import Bargraph from "./charts/Bargraph";

const HomePage = () => {
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  const [inventory, setInventory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [options, setOptions] = useState({});
  const [category, setCategory] = useState("");

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

  useEffect(async () => {
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
          setQuantity(snapshot.docs.length);
          setStockQuantity(tempQuantity);
          drawChart(temp);
        }
      });
  }, [userid, ctx.currentUser.companyName]);

  const getCategory = () => {
    const data = inventory;
    const unique = [...new Set(data.map((item) => item.category))];
    return unique;
  };
  if (!isLoaded) {
    return (
      <section className={classes.container}>
        <h1>Loading . . . </h1>
      </section>
    );
  }

  return (
    <section className={classes.container}>
      <span className={classes.overview}>Overview Dashboard</span>
      <br />

      <div className={classes.wrapper}>
        <br />
        <div className={classes.individual}>
          Total products
          <span className={classes.quantity}>{quantity}</span>
        </div>
        <div className={classes.individual}>
          Total stock count
          <span className={classes.quantity}>{stockQuantity}</span>
        </div>
        {/* <Bargraph options={options} /> */}
      </div>
      <br />

      <div className={classes.wrapper}>
        <h1>Product Category</h1>
        {getCategory().map((data) => (
          <h4>{data}</h4>
        ))}

        {/* {user.companyID === "" ? (
          <div>Company details not found</div>
        ) : (
          <div>
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
          </div>
        )} */}
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
    </section>
  );
};

export default HomePage;
