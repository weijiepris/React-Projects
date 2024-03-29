import React from "react";
import classes from "./App.module.css";
import { Switch, Route } from "react-router-dom";

import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";

import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";

import Footer from "./components/Footer";
import Documents from "./components/Documents";
function App() {
  return (
    <Switch>
      <React.Fragment>
        <div className={classes.container}>
          <Header />
          <NavigationBar />
        </div>

        <Switch>
          <Route path="/" exact component={AboutMe} />
          <Route path="/Experience" exact component={Experience} />
          <Route path="/Skills" exact component={Skills} />
          <Route path="/Education" exact component={Education} />
          <Route path="/Projects" exact component={Projects} />
          <Route path="/Documents" exact component={Documents} />
          <Route component={AboutMe} />
        </Switch>
        <Footer />
      </React.Fragment>
    </Switch>
  );
}

export default App;
