import React from "react";
import NavigationBar from "./components/NavigationBar";
import classes from "./App.module.css";
import { Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <React.Fragment>
        <div className={classes.container}>
          <NavigationBar />
          <div className={classes.main}>
            <h2>Sidenav Example</h2>
            <p>This sidenav is always shown.</p>
          </div>
        </div>
      </React.Fragment>
    </Switch>
  );
}

export default App;
