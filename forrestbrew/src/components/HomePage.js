import { useState, useEffect } from "react";
import firebase from "firebase";
import classes from "../components/auth/Login.module.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [user, setUser] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(userid);
    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
          setIsLoaded(true);
          console.log("user data loaded: " + user);
        } else {
          console.log("does not exist");
        }
      });

    return () => {
      console.log("cleanup");
    };
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
      <h1>Welcome! {user.name}</h1>
      <br></br>

      {user.companyID === "" ? (
        <div>Company details not found</div>
      ) : (
        <div className={classes.actions}>
          <Link to={{ pathname: "/viewInventory", state: user }}>
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
