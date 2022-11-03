import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";
import { FC, useContext, useRef } from "react";
import AuthenticationContext from "../../store/authentication-content";
import { onLogout } from "../auth/actions";
import "./Header.css";

interface Props {}

const Header: FC<Props> = ({}) => {
  const authenticationContext = useContext(AuthenticationContext);

  const logoutHandler = () => {
    onLogout().then((res: boolean) => {
      authenticationContext.setState(res);
    });
  };

  const menu = useRef(null);
  const items = [
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-cog",
      command: () => {
        logoutHandler();
      },
    },
  ];

  return (
    <>
      {authenticationContext.isLoggedIn ? (
        <header className="header-container">
          <div className="logo">
            <span>AUBERCOT</span>
          </div>
          <nav className="nav">
            <SlideMenu
              ref={menu}
              model={items}
              popup
              viewportHeight={190}
              menuWidth={170}
            ></SlideMenu>
            <div className="menu-icon">
              <i
                className="pi pi-bars"
                onClick={(event) => menu.current.toggle(event)}
              ></i>
            </div>
          </nav>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
