import { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import classes from "../components/auth/Login.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
const HomePage = () => {
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  const [isLoaded, setIsLoaded] = useState(false);

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
          console.log("does not exist");
        }
      });

    console.log("company => ", ctx.currentUser.companyName);

    firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        // console.log("testing => ", snapshot.docs);
        if (snapshot.docs.length) {
          snapshot.forEach((doc) => {
            // addInventory(doc.data());
            console.log(doc.data());
            // console.log(doc.data());
          });
        } else {
          console.log("no data found");
          // setDataExists(false);
        }
        // setIsLoaded(true);
      });

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
  }, [userid]);

  if (!isLoaded) {
    return (
      <section className={classes.auth}>
        <h1>Loading . . . </h1>
      </section>
    );
  }

  return (
    <section className={classes.auth}>
      <h1>Welcome! {ctx.currentUser.name}</h1>
      <br></br>

      {/* {batch[0].map((entry) => (
        <ul key={entry.batchNo}>
          <li>
            batch {entry.batchNo} count = {entry.occurrence}
          </li>
        </ul>
      ))} */}

      {user.companyID === "" ? (
        <div>Company details not found</div>
      ) : (
        <div className={classes.actions}>
          <Link to="/viewInventory">
            <button>View Inventory</button>
          </Link>
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
