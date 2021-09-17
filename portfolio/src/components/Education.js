import React from "react";
import classes from "./css/AboutMe.module.css";

const Education = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          Bachelor of Computer Science (Big Data)
        </div>
        <br />
        <p>2019 - Current</p>
        <ul></ul>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>Diploma in Business Enterprise IT</div>
        <br />
        <p>
          2014 - 2017
          <br />
          Cumulative GPA - 3.20
          <ul>
            <li>
              Academic Achievements
              <ul>
                <li>
                  Awarded Distinction for Programming Essentials &amp; Project
                </li>
                <li>
                  Awarded Distinction for Interactive Web Design &amp; Project
                </li>
              </ul>
            </li>
            <li>
              Projects
              <ul>
                <li>IT For Finance &amp; Case Study (SAP)</li>
                <li>Enterprise Solutions &amp; Project</li>
                <li>Enterprise Web &amp; Project (Java)</li>
                <li>Interactive Web Design &amp; Project (HTML5)</li>
                <li>Programming Essentials &amp; Project (Java)</li>
                <li>Headhunter Web Application (Final Year Project)</li>
              </ul>
            </li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>
          NITEC in Information-Communications Technology
        </div>
        <br />
        <p>
          2012 - 2013 <br />
          Cumulative GPA - 3.94
          <ul>
            <li>
              Academic Achievements
              <ul>
                <li>Director's List for Academic Year 2012</li>
                <li>Director's List for Academic Year 2013</li>
              </ul>
            </li>
            <li>
              Activities
              <ul>
                <li>Computer Club</li>
              </ul>
            </li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>GCE 'N' Levels</div>
        <br />
        <p>
          2007 - 2011
          <ul>
            <li>
              Academic Achievements
              <ul>
                <li>Junior Chef with Dining Etiquette</li>
                <li>Prize Winners Award for Secondary Three Normal Academic</li>
                <li>Computer Applications Model Student Award</li>
              </ul>
            </li>
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

export default Education;
