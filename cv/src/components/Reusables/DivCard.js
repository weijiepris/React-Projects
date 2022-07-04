import React from "react";
import classes from "../css/AboutMe.module.css";
import Seperator from "./Seperator";

const DivCard = (props) => {
  return (
    <React.Fragment>
      <div className={classes.header}>{props.title}</div>
      <p>
        {props.subtitle}
        <ul>
          {props.descriptions.map((description) => (
            <li>{description}</li>
          ))}
        </ul>
      </p>
      <Seperator />
    </React.Fragment>
  );
};

export default DivCard;
