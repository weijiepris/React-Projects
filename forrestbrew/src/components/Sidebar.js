import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase";
import { FaConfluence } from "@react-icons/all-files/fa/FaConfluence";
import { FaGlasses } from "@react-icons/all-files/fa/FaGlasses";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import AuthContext from "../store/auth-context";

const Sidebar = () => {
  const [arrow, setArrow] = useState(true);
  const [toggle, setToggle] = useState(false);
  const showHide = () => {
    // setToggle(!toggle);
  };

  const closeNav = (i) => {
    if (!arrow) {
      document.getElementById("sidenav").style.width = "50px";
      document.getElementById("container").style.marginLeft = "50px";
      document.getElementById("home").innerHTML = "";
      document.getElementById("inventory").innerHTML = "";
      document.getElementById("scan").innerHTML = "";
      document.getElementById("checker").innerHTML = "";
      setArrow(!arrow);
    }
  };

  const openNav = () => {
    if (arrow) {
      document.getElementById("sidenav").style.width = "130px";
      document.getElementById("container").style.marginLeft = "130px";
      setTimeout(function () {
        document.getElementById("home").innerHTML = "Home";
        document.getElementById("inventory").innerHTML = "Inventory";
        document.getElementById("scan").innerHTML = "Scan";
        document.getElementById("checker").innerHTML = "Checker";
      }, 200);
    } else {
      document.getElementById("sidenav").style.width = "50px";
      document.getElementById("container").style.marginLeft = "50px";
      document.getElementById("home").innerHTML = "";
      document.getElementById("inventory").innerHTML = "";
      document.getElementById("scan").innerHTML = "";
      document.getElementById("checker").innerHTML = "";
    }
    setArrow(!arrow);
  };
  return (
    <React.Fragment>
      <div className={classes.sidenav} id="sidenav">
        <div className={classes.content}>
          <Link
            to="/"
            exact="true"
            style={{ textDecoration: "none", color: "#383838" }}
            onClick={closeNav}
          >
            <FaHome size="30px" id="ihome" />
            <span id="home" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/ViewInventory"
            exact="true"
            style={{ textDecoration: "none", color: "#383838" }}
            onClick={closeNav}
          >
            <FaDatabase size="30px" id="iinventory" />
            <span id="inventory" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/Scan"
            exact="true"
            style={{ textDecoration: "none", color: "#383838" }}
            onClick={closeNav}
          >
            <FaConfluence size="30px" id="iscan" />
            <span id="scan" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/Checker"
            exact="true"
            style={{ textDecoration: "none", color: "#383838" }}
            onClick={closeNav}
          >
            <FaGlasses size="30px" id="ichecker" />
            <span id="checker" className={classes.hideText}></span>
          </Link>
        </div>
      </div>
      <div className={classes.pullButton} id="pullButton" onClick={openNav}>
        <div
          className={(classes.icon, toggle ? classes.change : "")}
          onClick={showHide}
        >
          {arrow ? (
            <FaBars size="30px" color="#383838" className={classes.fixed} />
          ) : (
            <FaTimes size="30px" color="#383838" className={classes.fixed} />
          )}
          {/* <div className={classes.bar1}></div>
          <div className={classes.bar2}></div>
          <div className={classes.bar3}></div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
