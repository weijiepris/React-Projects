import { FC, useContext } from "react";
import AuthenticationContext from "../../store/authentication-content";
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
            <span>
              <i className="pi pi-chart-bar"></i>Dashboard
            </span>
          </li>
          <li>
            <span>
              <i className="pi pi-box"></i>Inventory
            </span>
          </li>
          <li>
            <span>
              <i className="pi pi-cloud-upload"></i>Scan
            </span>
          </li>
          <li>
            <span>
              <i
                className="pi pi-database
"
              ></i>
              Sales
            </span>
          </li>
        </ul>
      </div>
      <Footer />
    </section>
  );
};

export default Sidebar;
