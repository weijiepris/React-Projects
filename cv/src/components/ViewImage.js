import React from "react";
import classes from "./css/AboutMe.module.css";
import Modal from "./Modal";

const ViewImage = (props) => {
  console.log(props);
  return (
    <Modal onClose={props.onClose}>
      <img src={props.image} className={classes.popOut} alt="tmp" />
    </Modal>
  );
};

export default ViewImage;
