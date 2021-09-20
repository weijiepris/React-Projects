import React from "react";
import classes from "./css/AboutMe.module.css";

import inventoryImage from "../image/inventory.png";
import inventoryImage2 from "../image/inventory2.png";

const Projects = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>Inventory Management Systems</div>
        <br />
        <p>
          August 2021 - Current
          <ul>
            <li>Built using React &amp; Firebase</li>
            <li>Cloud-Based inventory management system</li>
            <li>Working to meet client's requirements</li>
            <li>Hosted the web app using firebase hosting</li>
          </ul>
          <img className={classes.portImage} src={inventoryImage} />
          <img className={classes.portImage} src={inventoryImage2} />
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>BOLT (Food Finder)</div>
        <br />
        <p>
          June 2017 - Dec 2017
          <ul>
            <li>
              Developed using google's geolocation api to calculate distance to
              reach destination
            </li>
            <li>Exposed to PhoneGap's framework </li>
            <li>Used HTML, CSS, Javascript</li>
            <li>Used Firebase to store the data</li>
          </ul>
          Problems faced
          <ul>
            <li>Gathering information about the school's food stalls</li>
          </ul>
          Solution to problem
          <ul>
            <li>Conducted interviews with the students</li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>
          Food Catalogue (Singapore Polytechnic)
        </div>
        <br />
        <p>
          January 2017 - June 2017
          <ul>
            <li>
              To guide new students on where &amp; what foods are there in the
              school
            </li>
            <li>Exposed to PHP </li>
            <li>Used HTML, CSS, PHP</li>
          </ul>
          Problems faced
          <ul>
            <li>Researching on how to use Google's geolocation api</li>
          </ul>
          Solution to problem
          <ul>
            <li>
              Practicing numerous hours everyday &amp; also asking questions
              online, e.g Stackoverflow
            </li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>Enterprise Mobility Project</div>
        <br />
        <p>
          October 2015 - March 2016
          <ul>
            <li>
              To develop a mobile application for users to shop through the
              application.
            </li>
            <li>Exposed to ionic framework </li>
            <li>Used HTML, CSS, JQuery</li>
            <li>Used Firebase to store the data</li>
          </ul>
          Problems faced
          <ul>
            <li>
              Understanding the functions of Firebase and how to access it's
              database
            </li>
          </ul>
          Solution to problem
          <ul>
            <li>
              Spent hours of research &amp; practicing using Firebase's
              documentation
            </li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>Enterpise Web &amp; Project</div>
        <br />
        <p>
          April 2015 - August 2015
          <ul>
            <li>Developed an e-commerce web application using J2EE</li>
            <li>Used HTML, CSS, JServlet</li>
            <li>Used Oracle database to store the data</li>
          </ul>
          Problems faced
          <ul>
            <li>Needed to create a dynamic web app</li>
          </ul>
          Solution to problem
          <ul>
            <li>Spent hours of research on how to make a web page dynamic</li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>
          Interactive Web Design &amp; Project
        </div>
        <br />
        <p>
          October 2014 - March 2015
          <ul>
            <li>
              To promote a clean and green environment in Nanyang Polytechnic.
            </li>
            <li>Used Design Thinking Approach to gather data from students.</li>
            <li>Used HTML, CSS and JavaScript</li>
            <li>
              Developed a website to book any available clean and green events
              hosted by Nanyang Polytechnic
            </li>
          </ul>
          Problems faced
          <ul>
            <li>Understanding how HTML, CSS &amp; Javascript works</li>
          </ul>
          Solution to problem
          <ul>
            <li>
              Practicing numerous hours everyday &amp; also asking questions
              online, e.g Stackoverflow
            </li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>
          Programming Essentials &amp; Project
        </div>
        <br />
        <p>
          April 2014 - August 2014
          <ul>
            <li>
              Help students to keep track of their health and book school’s
              facilities on their mobile phones.
            </li>
            <li>Used Design Thinking Approach to gather data from students.</li>
            <li>Develop a program using Java.</li>
            <li>Used Indigo Studio to create user interface</li>
          </ul>
          Problems faced
          <ul>
            <li>Designing of user interface</li>
            <li>
              Collecting data to find out if this application would solve their
              problem
            </li>
          </ul>
          Solution to problem
          <ul>
            <li>
              Took up courses online to find out how to design a good user
              interface
            </li>
            <li>
              Went to conduct interview with people who are grouped up together
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

export default Projects;
