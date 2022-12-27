import React, { FC, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import AuthenticationContext from "../../store/authentication-content";
import { ScrollToTop } from "./actions/ScrollToTop";
import { UpcScan, Boxes, Truck } from "react-bootstrap-icons";

import Footer from "./Footer";
import "./Sidebar.css";
import { SlideMenu } from "primereact/slidemenu";
import { PanelMenu } from "primereact/panelmenu";

interface Props {}

const Sidebar: FC<Props> = ({}) => {
  const authenticationContext = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const menu = useRef(null);
  const reset = () => {
    ScrollToTop();
  };

  const showSlideMenu = (event: any) => {
    menu.current.toggle(event);
    reset();
  };

  useEffect(() => {
    return () => {};
  }, []);

  if (!authenticationContext.isLoggedIn) {
    return <></>;
  }

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Inventory",
      icon: "pi bi-boxes",
      items: [
        {
          label: "Products",
          icon: "pi pi-fw bi-box-seam",
          command: () => {
            navigate("/products");
          },
        },
        {
          label: "Scan",
          icon: "pi pi-fw bi-upc-scan",
          command: () => {
            navigate("/scan");
          },
        },
      ],
    },
    {
      label: "Sales",
      icon: "pi pi-fw pi-database",
      command: () => {
        navigate("/sales");
      },
    },
    {
      label: "Customers",
      icon: "pi pi-fw pi-users",
      command: () => {
        navigate("/customers");
      },
    },
    {
      label: "Suppliers",
      icon: "pi pi-fw bi-truck",
      command: () => {
        navigate("/suppliers");
      },
    },
    {
      label: "Settings",
      icon: "pi pi-fw pi-cog",
      command: () => {
        navigate("/settings");
      },
    },
  ];
  return (
    <section className="sidebar-container">
      <div className="sidebar-content">
        {/*  <ul>
          <li>
            <Link to="/">
              <span onClick={reset}>
                <i className="pi pi-chart-bar"></i>
                <span>Dashboard</span>
              </span>
            </Link>
          </li>

          <li>
            <SlideMenu
              ref={menu}
              model={inventoryMenuItems}
              popup
              viewportHeight={190}
              menuWidth={170}
              onMouseLeave={(event) => menu.current.toggle(event)}
            ></SlideMenu>
            <Link to="/inventory">
              <span onMouseEnter={(event) => menu.current.toggle(event)}>
                <i className="pi">
                  <Boxes />
                </i>
                <span>Inventory</span>
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
            <Link to="/customers">
              <span onClick={reset}>
                <i className="pi pi-users"></i>
                <span>Customers</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/suppliers">
              <span onClick={reset}>
                <i className="pi">
                  <Truck />
                </i>
                <span>Suppliers</span>
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
        </ul>*/}

        <PanelMenu model={items} />

        <Footer />
      </div>
    </section>
  );
};

export default Sidebar;
