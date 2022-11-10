import { FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthenticationContext from "../../store/authentication-content";
import { ScrollToTop } from "./actions/ScrollToTop";

import Footer from "./Footer";
import "./Sidebar.css";

interface Props {}

const Sidebar: FC<Props> = ({}) => {
  const authenticationContext = useContext(AuthenticationContext);
  const reset = () => {
    ScrollToTop();
  };

  useEffect(() => {
    return () => {};
  }, []);

  if (!authenticationContext.isLoggedIn) {
    return <></>;
  }

  return (
    <section className="sidebar-container">
      <div className="sidebar-content">
        <ul>
          <li>
            <Link to="/">
              <span onClick={reset}>
                <i className="pi pi-chart-bar"></i>
                <span>Dashboard</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <span onClick={reset}>
                <i className="pi pi-box"></i>
                <span>Inventory</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/scan">
              <span onClick={reset}>
                <i className="pi pi-cloud-upload"></i>
                <span>Scan</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/sales">
              <span onClick={reset}>
                <i className="pi pi-database"></i>
                <span>Sales</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <span onClick={reset}>
                <i className="pi pi-cog"></i>
                <span>Settings</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <Footer />
    </section>
  );
};

export default Sidebar;
