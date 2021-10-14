import React from "react";
import classes from "./css/AboutMe.module.css";

// import inventoryImage from "../image/inventory.png";
// import inventoryImage2 from "../image/inventory2.png";

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
              Developed a mobile application that can search for all cafe and
              restaurant nearby
            </li>
            <li>
              Technology used, HTML, CSS, Javascript, Firebase, PhoneGap,
              Google's geolocation API
            </li>
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
              Developed a web application to guide new students on where &amp;
              what foods are there in the school
            </li>
            <li>Technology used HTML, CSS, PHP</li>
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
              Developed a mobile application for users to shop through the
              application.
            </li>
            <li>
              Technologies used, ionic framework, HTML, CSS, JQuery, Firebase
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
            <li>Developed an e-commerce web application.</li>
            <li>Technologies used, HTML, CSS, JServlet, Oracle database</li>
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
              Developed a web application to promote a clean and green
              environment which includes functions that can book any available
              clean and green events hosted by Nanyang Polytechnic.
            </li>
            <li>
              Technologies used, Design Thinking Approach, HTML, CSS and
              JavaScript.
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
              Developed an application for students to keep track of their
              health and book school’s facilities on their mobile phones.
            </li>
            <li>
              Technologies used, Design Thinking Approach, Java, Indigo Studio
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
