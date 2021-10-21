import React, { useState, useEffect, useContext } from "react";
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
    let prodArr = [];
    let products = [];
    ctx.product.forEach((product) => {
      products.push(product);
      if (!prodArr[product.id]) {
        prodArr[product.id] = 0;
      }
    });
    ctx.batch.forEach((batch) => {
      prodArr[batch.prodID] += 1;
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
  }, [ctx.product, ctx.batch]);

  const showOverlay = () => {
    setOverlay(true);
  };

  const hideOverlay = () => {
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
      <span className={classes.overview}>Overview</span>
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
