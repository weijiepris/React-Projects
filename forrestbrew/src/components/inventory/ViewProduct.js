import React, { useState, useEffect, useContext } from "react";
// import classes from "./inventory.module.css";
import Modal from "../Reusables/Modal";
import AuthContext from "../../store/auth-context";
const ViewProduct = (props) => {
  const ctx = useContext(AuthContext);

  const [data, setData] = useState([]);
  useEffect(() => {
    ctx.product.forEach((pdoc) => {
      if (pdoc.id === props.data) {
        setData(pdoc);
      }
    });
  });

  return (
    <Modal onClose={props.onClose}>
      <ul>
        <li>Product ID: {data.id}</li>
        <li>Product Name: {data.name}</li>
        <li>Product Color: {data.color}</li>
        <li>Product Description: {data.description}</li>
        <li>Product Sales Price: {data.salesPrice}</li>
        <li>Product Cost Price: {data.costPrice}</li>
      </ul>
    </Modal>
  );
};

export default ViewProduct;
