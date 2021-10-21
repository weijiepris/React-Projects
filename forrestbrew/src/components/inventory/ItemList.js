import React from "react";
import classes from "./inventory.module.css";

const ItemList = (props) => {
  const openHandler = () => {
    // props.open(props);
  };

  return (
    <React.Fragment>
      {props.data.map((entry, index) => (
        <tr key={entry.serialno} className={classes.trow}>
          <td onClick={openHandler}>{index + 1}</td>
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
