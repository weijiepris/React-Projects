import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import ViewInventory from "./components/inventory/ViewInventory";
import AddProduct from "./components/inventory/AddProduct";
import Admin from "./components/admin/Admin";

const firebaseConfig = {
  apiKey: "AIzaSyDgECrWknG3jZG24XWOuDkMmXkaW7LS3as",
  authDomain: "forrestbrew.firebaseapp.com",
  projectId: "forrestbrew",
  storageBucket: "forrestbrew.appspot.com",
  messagingSenderId: "220722053401",
  appId: "1:220722053401:web:b445beb10d5a3b73b28588",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("use effect");
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
        console.log("not logged in");
      } else {
        setIsLoggedIn(true);
        setIsLoaded(true);
        console.log("logged in");
      }
    });
  }, []);

  if (!isLoaded) {
    return (
      <div>
        <Header />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        {isLoggedIn ? (
          <Route path="/" exact>
            <HomePage />
          </Route>
        ) : (
          <Route path="/" exact>
            <Login />
          </Route>
        )}
        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/register">
          <Register isLoggedIn={isLoggedIn} />
        </Route>

        <Route path="/viewInventory" component={ViewInventory} />

        <Route path="/AddProduct" component={AddProduct} />

        <Route path="/Admin" component={Admin} />
        
      </Switch>
    </React.Fragment>
  );
}

export default App;
