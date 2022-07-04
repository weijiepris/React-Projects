import React from "react";
import classes from "./css/AboutMe.module.css";
import DivCard from "./Reusables/DivCard";

const Experience = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <DivCard
          title={"Software Engineer"}
          subtitle={"NCS Pte Ltd, Jan 2020 - Present"}
          descriptions={[
            "Analyse process / program specifications & translate specifications to program codes, conforming to program guidelines and programming best practices",
            "Make changes to configurable items, which include hardware, software, documentation, etc. It covers configuration management planning, configuration identification, configuration controls & audits",
            "Develop unit test package, execute tests & document test results to ensure the quality of the program",
            "Assist in the integration testing, system testing, User Acceptance Test (UAT) & implementation activities to fix the reported problems/bugs of the system to ensure the smooth execution of programs in the production environment",
            "Investigate all reported problems/errors & initiate amendments & testing so that the system can operate correctly & efficiently",
          ]}
        />
        <DivCard
          title={"Senior Teacher Assistant / Covering Team Leader"}
          subtitle={"MindChamps, March 2014 - January 2020"}
          descriptions={[
            "Ensure that teaching centre is running smoothly",
            "Make sure all resources and equipment needed are accounted for",
            "Setting up classes and making sure all the equipment needed for the lessons are in the class",
            "Assist teachers in class, ensure the class runs smoothly",
            "Clean up the classes and prepare for the next lesson",
            "Help to create new resources which are to be used during lessons",
            "Guiding new teacher assistants on the workflow procedures",
          ]}
        />
        <DivCard
          title={"Software Engineer (Internship)"}
          subtitle={"NCS Pte Ltd, October 2016 - December 2016"}
          descriptions={[
            "Independently helped clients to upgrade their website with new functions and add new contents and pages.",
            "Assisted the project team to Implement a password complexity security for a new system development.",
            "Helped the client to migrate their intranet system and services to a new server.",
            "Conducted User Acceptance Testing for every new system development.",
            "Technologies used, HTML, CSS, JavaScript, C++, Excel, Windows Server",
          ]}
        />
        <DivCard
          title={"Customer Service Officer"}
          subtitle={"Micro 2000 Ptd Ltd, October 2013 - December 2013"}
          descriptions={[
            "Interact with customers to find out the issue with their Apple devices.",
            "Running diagnosis on their devices and explaining the procedures.",
            "Allowed me to work on my soft skills. (communication, confidence in speaking).",
          ]}
        />
        <DivCard
          title={"Logistics"}
          subtitle={"Micro 2000 Ptd Ltd, November 2011 - April 2012"}
          descriptions={[
            "Installation of computer hardwaredevices.",
            "Installation of windows 7 image onto desktops and laptops.",
            "Provisioning all machines to meet policy requirements.",
            "Deployed to work in most of the Primary and Secondary schools in Singapore.",
            "Setting up connection to the SSOE VPN.",
            "Guiding the staffs and teachers in the school on how to use the new system.",
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

export default Experience;
