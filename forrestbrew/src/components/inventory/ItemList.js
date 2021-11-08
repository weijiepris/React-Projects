import React from "react";
import classes from "./inventory.module.css";

const ItemList = (props) => {
  const openHandler = (id) => {
    props.open(id);
  };

  return (
    <React.Fragment>
      {props.data.map((entry, index) => (
        <tr key={entry.serialno} className={classes.trow}>
          <td onClick={() => openHandler(entry.id)}>{index + 1}</td>
          <td onClick={() => openHandler(entry.id)}>{entry.id}</td>
          <td onClick={() => openHandler(entry.id)}>{entry.name}</td>
          <td onClick={() => openHandler(entry.id)}>{entry.description}</td>
          <td
            onClick={() => openHandler(entry.id)}
            className={entry.quantity < 10 ? classes.red : ""}
          >
            {entry.quantity}
          </td>
          <td onClick={() => openHandler(entry.id)}>${entry.salesPrice}</td>
          <td onClick={() => openHandler(entry.id)}>${entry.costPrice}</td>
          {/* <td onClick={openHandler}>{getDate(entry.datecreated["seconds"])}</td> */}
        </tr>
      ))}
    </React.Fragment>
  );
};

export default ItemList;
