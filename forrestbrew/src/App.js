import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import ViewInventory from "./components/inventory/ViewInventory";
import AddProduct from "./components/inventory/AddProduct";
import Admin from "./components/admin/Admin";

import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);

  if (!ctx.isLoaded) {
    return (
      <div>
        <Header />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Header isLoggedIn={ctx.isLoggedIn} />
      <Switch>
        {ctx.isLoggedIn ? (
          <Route path="/" exact component={HomePage} />
        ) : (
          <Route path="/" exact component={Login} />
        )}
        <Route path="/profile" component={Profile} />

        <Route path="/register" component={Register} />

        <Route path="/viewInventory" component={ViewInventory} />

        <Route path="/AddProduct" component={AddProduct} />

        <Route path="/Admin" component={Admin} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
