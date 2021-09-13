import classes from "./Admin.module.css";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import ViewAllUsers from "./ViewAllUsers";

const Admin = (props) => {
  const [vac, setVac] = useState(false);
  const [vau, setVau] = useState(false);
  const [uu, setUu] = useState(false);
  const [uc, setUc] = useState(false);
  const [users, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [list, setList] = useState([]);

  const showOverlay = () => {
    console.log("showing overlay");
    setOverlay(true);
  };

  const hideOverlay = () => {
    setOverlay(false);
  };

  const openList = (data) => {
    setList(data);
    showOverlay();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          setUsersHandler(doc.data());
        });
      })
      .then(function () {
        setIsLoaded(true);
      });

    return () => {
      console.log("cleanup");
    };
  }, []);

  const setUsersHandler = (user) => {
    setUser((prevList) => {
      return [user, ...prevList];
    });
  };

  const vacHandler = () => {
    setVac(true);
    setVau(false);
    setUu(false);
    setUc(false);
  };
  const vauHandler = () => {
    openList(users);
    setVac(false);
    setVau(true);
    setUu(false);
    setUc(false);
  };
  const uuHandler = () => {
    setVac(false);
    setVau(false);
    setUu(true);
    setUc(false);
  };
  const ucHandler = () => {
    setVac(false);
    setVau(false);
    setUu(false);
    setUc(true);
  };
  const ViewAllCompanies = () => {
    return <div>ViewAllCompanies</div>;
  };
  //   const ViewAllUsers = () => {
  //     return <div></div>;
  //   };
  const UpdateUser = () => {
    return <div>UpdateUser</div>;
  };
  const UpdateCompany = () => {
    return <div>UpdateCompany</div>;
  };

  if (isLoaded === false) {
    return <div>Loading . . . </div>;
  }
  if (props.location.state !== undefined) {
    return (
      <div className={classes.container}>
        <div className={classes.actions}>
          <button onClick={vacHandler}>View all Companies</button>
          <br />
          <button onClick={vauHandler}>View all Users</button>
          <br />
          <button onClick={uuHandler}>Update User</button>
          <br />
          <button onClick={ucHandler}>Update Company</button>
          <br />
          <table>
            <tbody>
              {vac ? <ViewAllCompanies /> : ""}
              {vau && overlay ? (
                <ViewAllUsers data={list} onClose={hideOverlay} />
              ) : (
                ""
              )}
              {uu ? <UpdateUser /> : ""}
              {uc ? <UpdateCompany /> : ""}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // redirect back to home page if not an admin user role
  return <Redirect to="/" />;
};
export default Admin;
