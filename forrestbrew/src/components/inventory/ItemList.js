import React from "react";
import classes from "./inventory.module.css";

const ItemList = (props) => {
  const openHandler = () => {
    props.open(props);
  };

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(0, 25);
  };

  return (
    <React.Fragment>
      <td onClick={openHandler}>{props.data.serialno}</td>
      <td onClick={openHandler}>{props.data.id}</td>
      <td onClick={openHandler}>{props.data.name}</td>
      <td onClick={openHandler}>{props.data.description}</td>
      <td
        onClick={openHandler}
        className={props.data.quantity < 10 ? classes.red : ""}
      >
        {props.data.quantity}
      </td>
      <td onClick={openHandler}>${props.data.salesPrice}</td>
      <td onClick={openHandler}>${props.data.costPrice}</td>
      <td onClick={openHandler}>
        {getDate(props.data.datecreated["seconds"])}
      </td>
    </React.Fragment>
  );
};

export default ItemList;
