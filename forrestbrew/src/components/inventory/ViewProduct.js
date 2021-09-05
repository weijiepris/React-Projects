import React from "react";
import Modal from "../Reusables/Modal";
const ViewProduct = (props) => {
  console.log("in viewproduct");
  return (
    <Modal onClose={props.onClose}>
      <div>{props.data.id}</div>
      <div>{props.data.name}</div>
      <div>{props.data.quantity}</div>
      <div>{props.data.description}</div>
      <div>{props.data.datecreated}</div>
    </Modal>
  );
};

export default ViewProduct;
