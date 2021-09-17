import React from "react";
import classes from "./css/AboutMe.module.css";
const AboutMe = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>I'm Chan Wei Jie</h1>
        <p>
          I'm a front-end &amp; back-end developer.
          <br />
          <br />
          I'm based in Singapore. <br />
          <br />I build web applications with React!
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>About Me</div>
        <br />
        <p>
          Found my interest in programming during my time studying in ITE.
          <br />
          <br />
          Currently working on an cloud-based inventory system for a client.
          <br />
          <br />
          Self taught in building web applications using React.
          <br />
          <br />
          Hope to work on personal projects, building tools that help enrich
          lives through technology.
        </p>
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

export default AboutMe;
