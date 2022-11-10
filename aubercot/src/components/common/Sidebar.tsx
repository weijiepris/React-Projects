import { FC, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import AuthenticationContext from "../../store/authentication-content";
import { ScrollToTop } from "./actions/ScrollToTop";
import Footer from "./Footer";
import "./Sidebar.css";

interface Props {}

const Sidebar: FC<Props> = ({}) => {
  const authenticationContext = useContext(AuthenticationContext);

  if (!authenticationContext.isLoggedIn) {
    return <></>;
  }

  return (
    <section className="sidebar-container">
      <div className="sidebar-content">
        <ul>
          <li>
            <Link to="/">
              <span onClick={ScrollToTop}>
                <i className="pi pi-chart-bar"></i>Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <span onClick={ScrollToTop}>
                <i className="pi pi-box"></i>Inventory
              </span>
            </Link>
          </li>
          <li>
            <Link to="/scan">
              <span onClick={ScrollToTop}>
                <i className="pi pi-cloud-upload"></i>Scan
              </span>
            </Link>
          </li>
          <li>
            <Link to="/sales">
              <span onClick={ScrollToTop}>
                <i className="pi pi-database"></i>Sales
              </span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <span onClick={ScrollToTop}>
                <i className="pi pi-cog"></i>Settings
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
