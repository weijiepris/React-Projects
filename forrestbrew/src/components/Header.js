import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import AuthContext from "../store/auth-context";
const Header = (props) => {
  const ctx = useContext(AuthContext);

  const onLogout = () => {
    ctx.onLogout();
  };

  const closeNav = () => {
    document.getElementById("sidenav").style.width = "50px";
    document.getElementById("container").style.marginLeft = "50px";
    document.getElementById("home").innerHTML = "";
    document.getElementById("inventory").innerHTML = "";
    document.getElementById("scan").innerHTML = "";
    document.getElementById("checker").innerHTML = "";
  };
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/" style={{ textDecoration: "none" }} onClick={closeNav}>
          <h1>
            Aubercot
            {ctx.currentUser.userRole === "developer" ? (
              <span>Developer</span>
            ) : ctx.currentUser.userRole === "director" ? (
              <span>Director</span>
            ) : (
              <span></span>
            )}
          </h1>
        </Link>
        {props.isLoggedIn && (
          <div className={classes.nav}>
            {/* <Link to="/Checker" style={{ textDecoration: "none" }}>
              <div>Checker</div>
            </Link>
            <Link to="/Scan" style={{ textDecoration: "none" }}>
              <div>Scan In/Out</div>
            </Link>
            <Link to="/viewInventory" style={{ textDecoration: "none" }}>
              <div>View Inventory</div>
            </Link> 
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div>Profile</div>
            </Link>*/}
            <Link to="/" style={{ textDecoration: "none" }}>
              <div onClick={onLogout}>Logout</div>
            </Link>
          </div>
        )}
      </header>
    </React.Fragment>
  );
};

export default Header;
