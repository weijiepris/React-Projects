import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase";
import { FaConfluence } from "@react-icons/all-files/fa/FaConfluence";

const Sidebar = () => {
  const [arrow, setArrow] = useState(true);
  const [toggle, setToggle] = useState(false);
  const showHide = () => {
    // setToggle(!toggle);
  };

  const openNav = () => {
    setArrow(!arrow);

    if (arrow) {
      document.getElementById("sidenav").style.width = "320px";
      document.getElementById("container").style.marginLeft = "300px";
    } else {
      document.getElementById("sidenav").style.width = "50px";
      document.getElementById("container").style.marginLeft = "50px";
    }
  };
  return (
    <React.Fragment>
      <div className={classes.sidenav} id="sidenav">
        <div className={classes.content}>
          <Link
            to="/"
            exact="true"
            style={{ textDecoration: "none", color: "black" }}
          >
            <FaHome size="25px" />
          </Link>
          <br />
          <br />
          <Link
            to="/ViewInventory"
            exact="true"
            style={{ textDecoration: "none", color: "black" }}
          >
            <FaDatabase size="25px" />
          </Link>
          <br />
          <br />
          <Link
            to="/Scan"
            exact="true"
            style={{ textDecoration: "none", color: "black" }}
          >
            <FaConfluence size="25px" />
          </Link>
        </div>
      </div>
      <div className={classes.pullButton} id="pullButton" onClick={openNav}>
        <div
          className={(classes.icon, toggle ? classes.change : "")}
          onClick={showHide}
        >
          <div className={classes.bar1}></div>
          <div className={classes.bar2}></div>
          <div className={classes.bar3}></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
