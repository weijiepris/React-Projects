import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthenticationContext from "../../store/authentication-content";
import { ScrollToTop } from "./actions/ScrollToTop";
import "./Bottombar.css";
const Bottombar = () => {
  const authenticationContext = useContext(AuthenticationContext);

  if (!authenticationContext.isLoggedIn) {
    return <></>;
  }

  return (
    <section className="bottom-container">
      <ul>
        <li>
          <Link to="/">
            <span onClick={ScrollToTop}>
              <i className="pi pi-chart-bar"></i>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/inventory">
            <span onClick={ScrollToTop}>
              <i className="pi pi-box"></i>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/scan">
            <span onClick={ScrollToTop}>
              <i className="pi pi-cloud-upload"></i>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <span onClick={ScrollToTop}>
              <i className="pi pi-database"></i>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <span onClick={ScrollToTop}>
              <i className="pi pi-cog"></i>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Bottombar;
