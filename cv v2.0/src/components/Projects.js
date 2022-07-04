import React from "react";
import classes from "./css/AboutMe.module.css";
import DivCard from "./Reusables/DivCard";

const Projects = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <DivCard
          title={"Inventory Management Systems 2.0"}
          subtitle={"June 2022 - Current"}
          descriptions={[
            "Upgraded version of the previous Inventory Management System",
            "Technology used, React, Spring Boot, Firebase, Postgres, Docker",
          ]}
        />
        <DivCard
          title={"Inventory Management Systems"}
          subtitle={"August 2021 - Current"}
          descriptions={[
            "Built using React & Firebase",
            "Cloud-Based inventory management system",
            "Working to meet client's requirements",
            "Hosted the web app using firebase hosting",
          ]}
        />
        <DivCard
          title={"BOLT (Food Finder)"}
          subtitle={"June 2017 - Dec 2017"}
          descriptions={[
            "Developed a mobile application that can search for all cafe and restaurant nearby",
            "Technology used, HTML, CSS, Javascript, Firebase, PhoneGap, Google's geolocation API",
          ]}
        />
        <DivCard
          title={"Food Catalogue (Singapore Polytechnic)"}
          subtitle={"January 2017 - June 2017"}
          descriptions={[
            "Developed a web application to guide new students on where & what foods are there in the school",
            "Technology used HTML, CSS, PHP",
          ]}
        />
        <DivCard
          title={"Enterprise Mobility Project"}
          subtitle={"October 2015 - March 2016"}
          descriptions={[
            "Developed a mobile application for users to shop through the application.",
            "Technologies used, ionic framework, HTML, CSS, JQuery, Firebase",
          ]}
        />
        <DivCard
          title={"Enterpise Web & Project"}
          subtitle={"April 2015 - August 2015"}
          descriptions={[
            "Developed an e-commerce web application.",
            "Technologies used, HTML, CSS, JServlet, Oracle database",
          ]}
        />
        <DivCard
          title={"Interactive Web Design & Project"}
          subtitle={"October 2014 - March 2015"}
          descriptions={[
            "Developed a web application to promote a clean and green environment which includes functions that can book any available clean and green events hosted by Nanyang Polytechnic..",
            "Technologies used, Design Thinking Approach, HTML, CSS and JavaScript.",
          ]}
        />
        <DivCard
          title={"Programming Essentials & Project"}
          subtitle={"April 2014 - August 2014"}
          descriptions={[
            "Developed an application for students to keep track of their health and book school’s facilities on their mobile phones.",
            "Technologies used, Design Thinking Approach, Java, Indigo Studio.",
          ]}
        />
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
