import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import AuthContext from "../store/auth-context";
const Header = (props) => {
  const ctx = useContext(AuthContext);

  const onLogout = () => {
    ctx.onLogout();
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Apricot</h1>
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
