import { FC, useContext } from "react";
import AuthenticationContext from "../../store/authentication-content";
import "./Footer.css";

interface Props {}

const Footer: FC<Props> = ({}) => {
  const authenticationContext = useContext(AuthenticationContext);

  if (!authenticationContext.isLoggedIn) {
    return <></>;
  }

  return (
    <footer className="footer-container">
      <span>Aubercot 2022</span>
    </footer>
  );
};

export default Footer;
