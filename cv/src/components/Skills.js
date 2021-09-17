import React from "react";
import classes from "./css/AboutMe.module.css";

const Skills = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>Programming Languages</div>
        <p>
          <ul>
            <li>JavaScript (ES6)</li>
            <li>Java</li>
            <li>Python</li>
            <li>C++</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Basic SQL</li>
            <li>Ruby</li>
            <li>PHP</li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>Spoken Languages</div>
        <p>
          <ul>
            <li>English (Written &amp; Spoken</li>
            <li>Mandarin (Spoken)</li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Skills;
