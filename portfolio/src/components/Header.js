import React from "react";
import classes from "./css/Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/" exact="true" style={{ textDecoration: "none" }}>
          <div className={classes.text}>
            <span className={classes.text}>WEI JIE</span>
            <span>CHAN</span>
          </div>
        </Link>
        <div className={classes.nav}>
          <Link to="/" exact="true" style={{ textDecoration: "none" }}>
            <div>About Me</div>
          </Link>
          <Link to="/Education" style={{ textDecoration: "none" }}>
            <div>Education</div>
          </Link>
          <Link to="/Experience" style={{ textDecoration: "none" }}>
            <div>Experience</div>
          </Link>
          <Link to="/Projects" style={{ textDecoration: "none" }}>
            <div>Projects</div>
          </Link>
          <Link to="/Skills" style={{ textDecoration: "none" }}>
            <div>Skills</div>
          </Link>
        </div>
      </header>
      <div className={classes["main-image"]}></div>
    </React.Fragment>
  );
};

export default Header;
