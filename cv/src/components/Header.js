import React, { useState } from "react";
import classes from "./css/Header.module.css";
import { Link } from "react-router-dom";
import image from "../image/face.jpg";
const Header = () => {
  const [toggle, setToggle] = useState(false);

  const showHide = () => {
    setToggle(!toggle);
    var x = document.getElementById("nav");

    if (toggle) {
      x.style.height = "0";
    } else {
      x.style.height = "300px";
    }
  };

  const untoggle = () => {
    showHide();
  };
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.nav} id="nav">
          <Link
            to="/"
            exact="true"
            style={{ textDecoration: "none" }}
            onClick={untoggle}
          >
            <div>About Me</div>
          </Link>
          <Link
            to="/Education"
            style={{ textDecoration: "none" }}
            onClick={untoggle}
          >
            <div>Education</div>
          </Link>
          <Link
            to="/Experience"
            style={{ textDecoration: "none" }}
            onClick={untoggle}
          >
            <div>Experience</div>
          </Link>
          <Link
            to="/Projects"
            style={{ textDecoration: "none" }}
            onClick={untoggle}
          >
            <div>Projects</div>
          </Link>
          <Link
            to="/Skills"
            style={{ textDecoration: "none" }}
            onClick={untoggle}
          >
            <div>Skills</div>
          </Link>
        </div>
        <div
          className={(classes.icon, toggle ? classes.change : "")}
          onClick={showHide}
        >
          <div className={classes.bar1}></div>
          <div className={classes.bar2}></div>
          <div className={classes.bar3}></div>
        </div>
      </header>
      <div>
        <br />
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default Header;
