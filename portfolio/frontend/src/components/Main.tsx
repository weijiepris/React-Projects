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

  const { ref: introRef, inView: introView, entry: introEntry } = useInView();
  const {
    ref: frameworkRef,
    inView: frameworkView,
    entry: frameworkEntry,
  } = useInView();
  const {
    ref: languageRef,
    inView: languageView,
    entry: languageEntry,
  } = useInView();
  const {
    ref: experienceRef,
    inView: experienceView,
    entry: experienceEntry,
  } = useInView();
  const {
    ref: projectRef,
    inView: projectView,
    entry: projectEntry,
  } = useInView();
  const {
    ref: educationRef,
    inView: educationView,
    entry: educationEntry,
  } = useInView();
  const {
    ref: portfolioRef,
    inView: portfolioView,
    entry: portfolioEntry,
  } = useInView();

  useEffect(() => {
    // loadData();
    setIsLoaded((isLoaded) => (isLoaded = true));
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

  useEffect(() => {
    if (introView) {
      introEntry.target.classList.add(styles.appendStyling);
    }
    if (frameworkView) {
      frameworkEntry.target.classList.add(styles.appendStyling);
    }
    if (languageView) {
      languageEntry.target.classList.add(styles.appendStyling);
    }
    if (experienceView) {
      experienceEntry.target.classList.add(styles.appendStyling);
    }
    if (projectView) {
      projectEntry.target.classList.add(styles.appendStyling);
    }
    if (educationView) {
      educationEntry.target.classList.add(styles.appendStyling);
    }
    if (portfolioView) {
      portfolioEntry.target.classList.add(styles.appendStyling);
    }
  }, [
    introView,
    frameworkView,
    languageView,
    experienceView,
    projectView,
    educationView,
    portfolioView,
  ]);

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
        description={
          "I'm a fresh graduate from University Of Wollongong and currently working as a Software Engineer specialized in developing full stack applications."
        }
      />
      <Card
        title={""}
        bigHeader={""}
        smallHeader={"About me"}
        description={[
          <img
            className={styles.img}
            src={me}
            style={{
              float: "right",
              position: "inline-block",
            }}
          />,
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
        smallHeader={""}
        description={[
          "One of my most recent project that I have accomplished is an Inventory Management System",
          <img src={aubercot} />,
        ]}
      />
      {/* <section className={styles.contents}>
        <div className={styles.centraliseContent}>
          <div className={styles.aboutMe}>
            <span className={styles.fontSize30}>Hey there, my name is</span>
            <span
              className={[
                styles.appearAnimation,
                styles.fontSize120,
                styles.name,
              ].join(" ")}
              style={{ display: "block" }}
            >
              Chan Wei Jie
            </span>
            <span
              className={[styles.appearAnimation, styles.fontSize80].join(" ")}
              style={{ color: "#C8C8C8" }}
            >
              <p>I develop ideas to make one's life easier</p>
            </span>
            <span>
              <p
                className={[styles.fontSize30, styles.bio].join(" ")}
                style={{ color: "#C8C8C8", width: "60%" }}
              >
                I&apos;m a fresh graduate from University Of Wollongong and
                currently working as a Software Engineer specialized in
                developing full stack applications.
              </p>
            </span>
          </div>
        </div>
      </section> */}
      {/* <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={introRef}
      >
        <div className={styles.justify}>
          <div className={styles.aboutMe}>
            <span
              className={[styles.fontSize80, styles.contentTitle].join(" ")}
            >
              About me
            </span>
            <span
              className={[styles.appearAnimation, styles.fontSize30].join(" ")}
              style={{ color: "#C8C8C8" }}
            >
              <p className={styles.p}>
                <span
                  className={styles.aboutMeDescription}
                  style={{
                    display: "inline-block",
                    width: "55%",
                    position: "relative",
                  }}
                >
                  My name is Chan Wei Jie, sometimes my colleagues like to call
                  me Jay for short. My interest for programming started back
                  when I was 17, I was a student at ITE (Simei). In the year of
                  2021, I chanced upon an opportunity in developing an Inventory
                  Management System (
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
                  </a>
                  ) for a client.
                </span>
                <div className={styles.overlayContainer}>
                  <div className={styles.overlay}></div>
                  <img
                    className={styles.img}
                    src={me}
                    style={{
                      float: "right",
                      position: "inline-block",
                    }}
                  />
                </div>
                <br />
                <p className={styles.aboutMeDescription}>
                  These are few of the technologies that I have been working on
                  recently.
                </p>
                <ul className={styles.aboutMeDescription}>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>Angular</li>
                  <li>Firebase (Firestore &amp; Hosting)</li>
                </ul>
              </p>
            </span>
          </div>
        </div>
      </section> */}
      {/* <br />
      <br />
      <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={portfolioRef}
      >
        <div className={styles.justify}>
          <p style={{ fontSize: "30%", textAlign: "left" }}>
            One of my most recent project that I have accomplished is an
            Inventory Management System
          </p>
        </div>
        <img src={aubercot} height={"60%"} />
      </section> */}
      <br />
      <br />
      <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={frameworkRef}
      >
        <Frameworks />
      </section>
      <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={languageRef}
      >
        <Languages />
      </section>
      <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={experienceRef}
      >
        <Experiences />
      </section>
      <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={projectRef}
      >
        <Projects />
      </section>
      <section
        className={[styles.contents, styles.hideSection].join(" ")}
        ref={educationRef}
      >
        <Educations />
      </section>
    </div>
  );
}
