import React from "react";

const ItemList = (props) => {
  const openHandler = () => {
    props.open(props);
  };

  return (
    <React.Fragment>
      <td onClick={openHandler}>{props.serialno}</td>
      <td onClick={openHandler}>{props.id}</td>
      <td onClick={openHandler}>{props.name}</td>
      <td onClick={openHandler}>{props.description}</td>
      <td onClick={openHandler}>{props.quantity}</td>
      <td onClick={openHandler}>{props.datecreated}</td>
    </React.Fragment>
  );
};

export default ItemList;
