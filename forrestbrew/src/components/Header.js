import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
const Header = (props) => {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setCompanyName(snapshot.data().companyName);
            }
          });
      } else {
        setCompanyName("");
      }
    });
  });

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setCompanyName("");
      });
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1>{companyName}</h1>
        </Link>
        {props.isLoggedIn && (
          <div className={classes.nav}>
            <Link to="/">
              <div onClick={onLogout}>Logout</div>
            </Link>
            <Link to="/profile">
              <div>Profile</div>
            </Link>
          </div>
        )}
      </header>
      <div className={classes["main-image"]}></div>
    </React.Fragment>
  );
};

export default Header;
