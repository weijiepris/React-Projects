import React from "react";
import classes from "./inventory.module.css";

const ItemList = (props) => {
  const openHandler = () => {
    // props.open(props);
  };

  const getDate = (date) => {
    return new Date(date * 1000).toString().substring(4, 15);
  };

  return (
    <React.Fragment>
      {props.data.map((entry) => (
        <tr key={entry.serialno} className={classes.trow}>
          <td onClick={openHandler}>{entry.serialno}</td>
          <td onClick={openHandler}>{entry.id}</td>
          <td onClick={openHandler}>{entry.name}</td>
          <td onClick={openHandler}>{entry.description}</td>
          <td
            onClick={openHandler}
            className={entry.quantity < 10 ? classes.red : ""}
          >
            {entry.quantity}
          </td>
          <td onClick={openHandler}>${entry.salesPrice}</td>
          <td onClick={openHandler}>${entry.costPrice}</td>
          {/* <td onClick={openHandler}>{getDate(entry.datecreated["seconds"])}</td> */}
        </tr>
      ))}
    </React.Fragment>
  );
};

export default ItemList;
