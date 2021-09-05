import { useState, useEffect } from "react";
import classes from "./inventory.module.css";
import firebase from "firebase";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";
import ViewProduct from "./ViewProduct";

const ViewInventory = (props) => {
  const [inventory, setInventory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [list, setList] = useState([]);
  const userid = firebase.auth().currentUser.uid;

  console.log(props);
  const showOverlay = () => {
    console.log("showing overlay");
    setOverlay(true);
  };

  const hideOverlay = () => {
    setOverlay(false);
  };

  const openList = (product) => {
    console.log(product["name"]);
    setList(product);
    showOverlay();
  };

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(0, 25);
  };
  useEffect(() => {
    console.log(props.location.state.companyName);
    firebase
      .firestore()
      .collection("companies")
      .doc(props.location.state.companyName)
      .collection("product")
      .orderBy("serialno", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          addInventory(doc.data());
        });
        setIsLoaded(true);
      });

    return () => {
      console.log("cleanup");
    };
  }, [userid]);

  const addInventory = (list) => {
    setInventory((prevList) => {
      return [list, ...prevList];
    });
  };
  return (
    <div className={classes.container}>
      {overlay && <ViewProduct data={list} onClose={hideOverlay} />}
      <form>
        <table>
          <tbody>
            {!isLoaded ? (
              <div>Getting inventory list . . .</div>
            ) : (
              <tr>
                <th>S/N</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Quantity</th>
                <th>Date Created</th>
              </tr>
            )}
            {!isLoaded ? (
              <tr></tr>
            ) : (
              inventory.map((entry) => (
                <tr key={entry.serialno} className={classes.trow}>
                  <ItemList
                    serialno={entry.serialno}
                    id={entry.id}
                    name={entry.name}
                    description={entry.description}
                    quantity={entry.quantity}
                    datecreated={getDate(entry.datecreated["seconds"])}
                    open={openList}
                  />
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br></br>
      </form>
      <div className={classes.actions}>
        <Link to={{ pathname: "/AddProduct", state: props.location.state }}>
          <button>Add New Product</button>
        </Link>
      </div>
      <br></br>
      <div className={classes.actions}>
        <button>Remove a Product</button>
      </div>
    </div>
  );
};

export default ViewInventory;
