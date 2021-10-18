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

  const fetchData = async () => {
    console.log("fetching data for ViewInventory");
    let prodArr = [];
    let products = [];

    const productsRef = firebase
      .firestore()
      .collection("products")
      .doc(ctx.currentUser.companyName)
      .collection("products");

    const batchRef = firebase
      .firestore()
      .collection("batch")
      .doc(ctx.currentUser.companyName)
      .collection("products");

    const productsSnapshot = await productsRef.orderBy("id", "asc").get();
    const batchSnapshot = await batchRef.where("scanType", "==", "in").get();

    productsSnapshot.forEach(async (doc) => {
      products.push(doc.data());
      if (!prodArr[doc.data().id]) {
        prodArr[doc.data().id] = 0;
      }
    });

    batchSnapshot.forEach((doc) => {
      prodArr[doc.data().prodID] += 1;
    });

    for (let i in prodArr) {
      for (let k in products) {
        if (products[k].id === i) {
          products[k].quantity = prodArr[i];
        }
      }
    }

    products.sort(function (a, b) {
      var textA = a.prodID.toUpperCase();
      var textB = b.prodID.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    setInventory(products);
    setDataExists(true);
    setIsLoaded(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const addInventory = (list) => {
  //   setInventory((prevList) => {
  //     return [list, ...prevList];
  //   });
  // };
  const showOverlay = () => {
    setOverlay(true);
  };

  const hideOverlay = () => {
    // retrieveList();
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
                    <th>Quantity</th>
                    <th>Sales Price</th>
                    <th>Cost Price</th>
                  </tr>
                )}

                {!isLoaded ? (
                  <tr></tr>
                ) : (
                  <ItemList data={inventory} open={openList} />
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
