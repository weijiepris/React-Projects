import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import classes from "./inventory.module.css";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";
import ViewProduct from "./ViewProduct";

import AuthContext from "../../store/auth-context";

const ViewInventory = (props) => {
  const ctx = useContext(AuthContext);

  const [overlay, setOverlay] = useState(false);
  const [list, setList] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataExists, setDataExists] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .orderBy("serialno", "desc")
      .get()
      .then((snapshot) => {
        // console.log("testing => ", snapshot.docs);
        if (snapshot.docs.length) {
          snapshot.forEach((doc) => {
            addInventory(doc.data());
            // console.log(doc.data());
          });
        } else {
          console.log("no data found");
          setDataExists(false);
        }
        setIsLoaded(true);
      });
  }, [ctx.currentUser.companyName]);

  const retrieveList = () => {
    setIsLoaded(false);
    setInventory([]);
    firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products")
      .orderBy("serialno", "desc")
      .get()
      .then((snapshot) => {
        // console.log("testing => ", snapshot.docs);
        if (snapshot.docs.length) {
          snapshot.forEach((doc) => {
            addInventory(doc.data());
            // console.log(doc.data());
          });
        } else {
          console.log("no data found");
          setDataExists(false);
        }
        setIsLoaded(true);
      });
  };
  const addInventory = (list) => {
    setInventory((prevList) => {
      return [list, ...prevList];
    });
  };
  const showOverlay = () => {
    setOverlay(true);
  };

  const hideOverlay = () => {
    retrieveList();
    setOverlay(false);
  };

  const openList = (data) => {
    setList(data);
    showOverlay();
  };

  return (
    <div className={classes.container} id="container">
      {overlay && (
        <ViewProduct
          data={list}
          user={ctx.currentUseruser}
          onClose={hideOverlay}
        />
      )}
      <span className={classes.overview}>Inventory</span>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.actions}>
          <br />
          <Link to="/AddProduct">
            <button>Add New Product</button>
          </Link>
          {/* <button>Remove a Product</button> */}
        </div>
      </div>

      <br />
      <div className={classes.wrapper}>
        <br />
        <div className={classes.content}>
          <form>
            <table>
              <tbody>
                {!isLoaded ? (
                  <tr>
                    <th>Getting inventory list . . .</th>
                  </tr>
                ) : (
                  <tr>
                    <th>S/N</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity on hand</th>
                    <th>Sales Price</th>
                    <th>Cost Price</th>
                    <th>Date Created</th>
                  </tr>
                )}

                {!isLoaded ? (
                  <tr></tr>
                ) : (
                  inventory.map((entry) => (
                    <tr key={entry.serialno} className={classes.trow}>
                      <ItemList data={entry} open={openList} />
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <br></br>
            {!dataExists ? <div>No data found</div> : <div></div>}
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewInventory;
