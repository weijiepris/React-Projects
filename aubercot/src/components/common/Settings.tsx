import { FC, useContext } from "react";
import { Button } from "react-bootstrap";
import AuthenticationContext from "../../store/authentication-content";
import { onLogout } from "../auth/actions";

interface Props {
  alert: Function;
}
const Settings: FC<Props> = ({ alert }) => {
  const authenticationContext = useContext(AuthenticationContext);

  const logoutHandler = () => {
    onLogout()
      .then((res: boolean) => {
        authenticationContext.setState(res);
      })
      .then(() => {
        alert({
          message: "You have been logged out",
          type: "",
        });
      });
  };

  return (
    <main className="section-container">
      <section className="header">
        <h1>Settings</h1>
      </section>
      <section className="section">
        <Button>Profile</Button>
      </section>
      <section className="section">
        <Button onClick={logoutHandler}>Logout</Button>
      </section>
    </main>
  );
};

export default Settings;
