import React from "react";
import classes from "./css/AboutMe.module.css";
import Seperator from "./Reusables/Seperator";

const Skills = () => {
  let listOfTechnologies = [
    "React",
    "MySQL",
    "MongoDB",
    "CSS",
    "C++",
    "Java",
    "JavaScript",
    "Python",
    "JSP",
    "HTML5",
    "Ruby",
    "PHP",
    "OOP",
  ];

  let listOfFrameworks = [
    "Ruby On Rails",
    "PhoneGap",
    "Ionic",
    "Spring Boot",
    "Angular",
  ];
  listOfTechnologies.sort();
  listOfFrameworks.sort();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>Frameworks</div>
        <p>
          <ul>
            {listOfFrameworks.map((framework) => (
              <li>{framework}</li>
            ))}
          </ul>
        </p>
        <Seperator />
        <div className={classes.header}>Technologies</div>
        <p>
          <ul>
            {listOfTechnologies.map((technology) => (
              <li>{technology}</li>
            ))}
          </ul>
        </p>
        <Seperator />
        <div className={classes.header}>Languages</div>
        <p>
          <ul>
            <li>English (Written &amp; Spoken</li>
            <li>Mandarin (Spoken)</li>
          </ul>
        </p>
        <Seperator />
        <div className={classes.header}>Others</div>
        <p>
          <ul>
            <li>Class 3 Driving license (6 Years)</li>
          </ul>
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

export default Skills;
