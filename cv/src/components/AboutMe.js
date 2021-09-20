import React from "react";
import classes from "./css/AboutMe.module.css";
import image from "../image/face.jpg";
const AboutMe = () => {
  return (
    <div className={classes.container}>
      <div className={classes.headerphoto}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <img src={image} alt="profile" />
      </div>
      <div className={classes.content}>
        <h1>I'm Chan Wei Jie</h1>
        <p>
          I'm a front-end &amp; back-end developer based in Singapore, and I
          build web applications with React!
          <br /> My passion for programming began during my time studying in
          ITE. <br />
          Through this passion, I learned to stay up to date with the javascript
          library such as React, a newer library not taught in classrooms yet.
          <br />
          <br />I identified that one of the most significant challenges a
          friend of mine is facing in their business is Inventory Management,
          which led me to develop a cloud-based inventory system currently.
          <br />
          My personal goal is to work on projects and building tools that help
          enrich lives through technology.
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
