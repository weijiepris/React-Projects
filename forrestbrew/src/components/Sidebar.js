import React, { useState, useContext } from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

// import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
// import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { AiOutlineScan } from "@react-icons/all-files/ai/AiOutlineScan";
import { AiOutlineDatabase } from "@react-icons/all-files/ai/AiOutlineDatabase";
import { GiSpectacles } from "@react-icons/all-files/gi/GiSpectacles";
import { IoIosMenu } from "@react-icons/all-files/io/IoIosMenu";
// import { TiTimesOutline } from "@react-icons/all-files/ti/TiTimesOutline";
// import { BiMenuAltLeft } from "@react-icons/all-files/bi/BiMenuAltLeft";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { AiFillWindows } from "@react-icons/all-files/ai/AiFillWindows";
// import { AiOutlineBorderlessTable } from "@react-icons/all-files/ai/AiOutlineBorderlessTable";

const Sidebar = () => {
  const ctx = useContext(AuthContext);
  const [arrow, setArrow] = useState(true);
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
      document.getElementById("date").innerHTML = "";
      setArrow(!arrow);
    }
  };

  const openNav = () => {
    if (arrow) {
      document.getElementById("sidenav").style.width = "130px";
      document.getElementById("container").style.marginLeft = "130px";
      setTimeout(function () {
        document.getElementById("home").innerHTML = "Overview";
        document.getElementById("inventory").innerHTML = "Inventory";
        document.getElementById("scan").innerHTML = "Scan";
        document.getElementById("checker").innerHTML = "Checker";
        document.getElementById("date").innerHTML = "Get Date";
      }, 200);
    } else {
      document.getElementById("sidenav").style.width = "50px";
      document.getElementById("container").style.marginLeft = "50px";
      document.getElementById("home").innerHTML = "";
      document.getElementById("inventory").innerHTML = "";
      document.getElementById("scan").innerHTML = "";
      document.getElementById("checker").innerHTML = "";
      document.getElementById("date").innerHTML = "";
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
            style={{ textDecoration: "none" }}
            onClick={closeNav}
          >
            <BiHomeAlt size="30px" id="ihome" />
            <span id="home" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/Scan"
            exact="true"
            style={{ textDecoration: "none" }}
            onClick={closeNav}
          >
            <AiOutlineScan size="30px" id="iscan" />
            <span id="scan" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/ViewInventory"
            exact="true"
            style={{ textDecoration: "none" }}
            onClick={closeNav}
          >
            <AiOutlineDatabase size="30px" id="iinventory" />
            <span id="inventory" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/DateChecker"
            exact="true"
            style={{ textDecoration: "none" }}
            onClick={closeNav}
          >
            <AiOutlineCalendar size="30px" id="idate" />
            <span id="date" className={classes.hideText}></span>
          </Link>
          <br />
          <br />
          <Link
            to="/Checker"
            exact="true"
            style={{ textDecoration: "none" }}
            onClick={closeNav}
          >
            <GiSpectacles size="30px" id="ichecker" />
            <span id="checker" className={classes.hideText}></span>
          </Link>
          <br />
          <br />

          {ctx.currentUser.userRole === "developer" ? (
            <Link
              to="/Overview"
              exact="true"
              style={{ textDecoration: "none" }}
              onClick={closeNav}
            >
              <AiFillWindows size="30px" id="idev" />
              <span id="dev" className={classes.hideText}></span>
            </Link>
          ) : (
            <span id="dev"></span>
          )}
        </div>
      </div>
      <div className={classes.pullButton} id="pullButton" onClick={openNav}>
        <div className={classes.icon} onClick={showHide}>
          {arrow ? (
            <IoIosMenu size="30px" color="#164b66" className={classes.fixed} />
          ) : (
            <IoIosMenu size="30px" color="#164b66" className={classes.fixed} />
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
