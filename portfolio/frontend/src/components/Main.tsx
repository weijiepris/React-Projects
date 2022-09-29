// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import NavigationBar from "./NavigationBar.tsx";
import styles from "./Main.module.css";
import wjwhite from "../image/specs whte.svg";
import aubercot from "../image/aubercot.png";
import me from "../image/me.jpg";

import {
  loadDefault,
  getFrameworks,
  getEducations,
  getTechnologies,
  getLanguages,
  getExperiences,
  getProjects,
} from "../actions/service.tsx";

import { useInView } from "react-intersection-observer";
import Card from "./common/Card.tsx";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
    // setIsLoaded((isLoaded) => (isLoaded = true));
    return () => {
      setFrameworks([]);
      setTechnologies([]);
      setLanguages([]);
      setExperiences([]);
      setProjects([]);
      setEducations([]);
      setIsLoaded((isLoaded) => (isLoaded = false));
      setErrorMessage((errorMessage) => (errorMessage = ""));
    };
  }, []);
  const loadData = async () => {
    try {
      await loadDefault();
      setEducations(await getEducations());
      setFrameworks(await getFrameworks());
      setTechnologies(await getTechnologies());
      setLanguages(await getLanguages());
      setExperiences(await getExperiences());
      setProjects(await getProjects());
      setTimeout(() => {
        setIsLoaded((isLoaded) => (isLoaded = true));
      }, 3000);
    } catch (err) {
      setErrorMessage(err.code + ": " + err.message);
    }
  };
  const Frameworks = () => {
    return (
      <div>
        Frameworks
        {frameworks.map((framework) => (
          <div key={framework}>{framework}</div>
        ))}
      </div>
    );
  };

  const Technologies = () => {
    return (
      <div>
        Technologies
        {technologies.map((technology) => (
          <div key={technology}>{technology}</div>
        ))}
      </div>
    );
  };

  const Languages = () => {
    return (
      <div>
        Languages
        {languages.map((language) => (
          <div key={language}>{language}</div>
        ))}
      </div>
    );
  };

  const Experiences = () => {
    return (
      <div>
        Experiences
        {experiences.map((experience) => (
          <div key={experience.title}>
            {experience.title}
            {experience.company}
            {experience.category}
            {experience.dateStart}
            {experience.dateEnd}
            {experience.descriptions}
            {experience.skills}
          </div>
        ))}
      </div>
    );
  };

  const Projects = () => {
    return (
      <div>
        Projects
        {projects.map((project) => (
          <div key={project.title}>
            {project.title}
            {project.dateStart}
            {project.dateEnd}
            {project.descriptions}
            {project.skills}
          </div>
        ))}
      </div>
    );
  };

  const Educations = () => {
    return (
      <div>
        Educations
        {educations.map((education) => (
          <div key={education.title}>
            {education.title}
            {education.dateStart}
            {education.dateEnd}
            {education.school}
          </div>
        ))}
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <NavigationBar isLoaded={isLoaded} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.ring}>
          <div className={styles.blurDiv}></div>
          <img src={wjwhite} className={styles.loading} />
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <NavigationBar />
      <Card
        title={"Hey there, my name is"}
        bigHeader={"Chan Wei Jie"}
        smallHeader={"I develop ideas to make one's life easier"}
        description={[
          <p>
            I&apos;m a fresh graduate from University Of Wollongong and
            currently working as a Software Engineer specialized in developing
            full stack applications.
          </p>,
        ]}
      />
      <Card
        title={""}
        bigHeader={""}
        smallHeader={"About me"}
        description={[
          ,
          "My name is Chan Wei Jie, sometimes my colleagues like to call me Jay for short. " +
            "My interest for programming started back when I was 17, I was a student at ITE (Simei). " +
            "In the year of 2021, I chanced upon an opportunity in developing an Inventory Management System (",
          <a
            href="https://aubercot.com/"
            target="_blank"
            style={{
              fontFamily: "Mirande",
              fontSize: "120%",
              fontWeight: "none",
              color: "white",
            }}
          >
            Aubercot
          </a>,
          ") for a client.",
          ,
          <p className={styles.aboutMeDescription}>
            These are few of the technologies that I have been working on
            recently.
          </p>,
          <ul className={styles.aboutMeDescription}>
            <li>React</li>
            <li>Node.js</li>
            <li>Angular</li>
            <li>Firebase (Firestore &amp; Hosting)</li>
          </ul>,
        ]}
      />
      <Card
        title={""}
        bigHeader={""}
        smallHeader={"Where I've worked"}
        description={[
          experiences.map((experience) => (
            <div>
              <p>
                {experience.company} &nbsp;
                {experience.dateStart} - {experience.dateEnd}
              </p>
              {experience.descriptions.map((desc) => (
                <p>{desc}</p>
              ))}
            </div>
          )),
        ]}
      />
      <Card
        title={""}
        bigHeader={""}
        smallHeader={""}
        description={[
          "One of my most recent project that I have accomplished is an Inventory Management System",
          <img src={aubercot} style={{ maxHeight: "500px" }} />,
        ]}
      />
      <br />
      <br />
      <section className={[styles.contents, styles.hideSection].join(" ")}>
        <Frameworks />
      </section>
      <section className={[styles.contents, styles.hideSection].join(" ")}>
        <Languages />
      </section>
      <section className={[styles.contents, styles.hideSection].join(" ")}>
        <Experiences />
      </section>
      <section className={[styles.contents, styles.hideSection].join(" ")}>
        <Projects />
      </section>
      <section className={[styles.contents, styles.hideSection].join(" ")}>
        <Educations />
      </section>
    </div>
  );
}
