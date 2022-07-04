import React from "react";
import classes from "./css/AboutMe.module.css";
import Seperator from "./Reusables/Seperator";

const Education = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          Bachelor of Computer Science (Big Data)
        </div>
        <p>
          Singapore Institute of Management(UOW) <br /> 2019 - Current
          <ul>
            <li>
              Skills Learnt
              <ul>
                <li>Python</li>
                <li>C++</li>
                <li>R Studio</li>
                <li>Jupyter Notebook</li>
                <li>Apache Pig</li>
                <li>Big Data applications</li>
                <li>Hive</li>
                <li>Hadoop</li>
                <li>Map Reduce</li>
              </ul>
            </li>
          </ul>
        </p>
        <Seperator />
        <div className={classes.header}>Diploma in Business Enterprise IT</div>
        <p>
          Nanyang Polytechnic <br />
          2014 - 2017
          <br />
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
              Activities
              <ul>
                <li>Student Leader for Nanyang Polytechnic Open House</li>
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
        <Seperator />
        <div className={classes.header}>
          NITEC in Information-Communications Technology
        </div>
        <p>
          ITE College East (Simei)
          <br />
          2012 - 2013 <br />
          <br />
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
                <li>
                  Commitee Member of Computer Club
                  <ul>
                    <li>Awarded Platinum for best conduct</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </p>
        <Seperator/>
        <div className={classes.header}>GCE 'N' Levels</div>
        <br />
        <p>
          Bedok Green Secondary School <br />
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
