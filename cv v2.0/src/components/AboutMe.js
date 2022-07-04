import React, { useState } from "react";
import classes from "./css/AboutMe.module.css";
// import image from "../image/face.jpg";
import body from "../image/body.jpg";
const AboutMe = () => {
  return (
    <div className={classes.container}>
      <div className={classes.headerphoto}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <img src={body} alt="profile" />
      </div>
      <div className={classes.content}>
        <h1>I'm Chan Wei Jie</h1>
        <p>
          I'm a front-end &amp; back-end developer based in Singapore, and I
          build web applications with React!
          <br />
          <br /> My passion for programming began during my time studying in
          ITE. <br />
          Through this passion, I learned to stay up to date with the javascript
          library such as React, a newer library not taught in classrooms yet.
          <br />
          <br />I have identified that one of the most significant challenges a
          friend of mine is facing in their business is Inventory Management,
          which led me to develop a cloud-based inventory system currently.
          <br />
          My personal goal is to work on projects and building tools that help
          enrich lives through technology.
          <br />
          <br />
          I enjoy guiding my peers on how to solve any problems especially if
          they are programming related. I also have lots of patience when it
          comes to solving a difficult problem
          <br />
          <br /> I'm always up for a challenge and keen to gain new knowledge!
          <br />
          <br />I hope to work on more personal projects, building tools that
          help enrich lives through technology.
        </p>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default AboutMe;
