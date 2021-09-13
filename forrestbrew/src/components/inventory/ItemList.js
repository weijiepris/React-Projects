import React from "react";

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
      <td onClick={openHandler}>{props.data.quantity}</td>
      <td onClick={openHandler}>
        {getDate(props.data.datecreated["seconds"])}
      </td>
    </React.Fragment>
  );
};

export default ItemList;
