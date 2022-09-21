// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar.tsx";
import styles from "./Main.module.css";
import { Skills, Experiences, Educations, Projects } from "../model/model";
import wjwhite from "../image/specs whte.svg";
import aubercot from "../image/aubercot.png";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const devMode = true;
  let url = "";

  if (devMode) {
    url = "http://localhost:3002/";
  } else {
    url = "https://us-central1-portfolio-v2-b469e.cloudfunctions.net/app/";
  }

  const getFrameworks = async () => {
    const data: Skills = await axios
      .get(url + "frameworks")
      .then((res) => res.data);
    setFrameworks(data);
  };

  const getTechnologies = async () => {
    const data: Skills = await axios
      .get(url + "technologies")
      .then((res) => res.data);
    setTechnologies(data);
  };

  const getLanguages = async () => {
    const data: Skills = await axios
      .get(url + "languages")
      .then((res) => res.data);
    setLanguages(data);
  };

  const getExperiences = async () => {
    const data: Experiences = await axios
      .get(url + "experiences")
      .then((res) => res.data);
    setExperiences(data);
  };

  const getProjects = async () => {
    const data: Projects = await axios
      .get(url + "projects")
      .then((res) => res.data);
    setProjects(data);
  };

  const getEducations = async () => {
    const data: Educations = await axios
      .get(url + "educations")
      .then((res) => res.data);
    setEducations(data);
  };

  const loadDefault = async () => {
    await axios.get(url).then((res) => res.data);
  };

  useEffect(() => {
    // loadDefault()
    //   .then(() => getFrameworks())
    //   .then(() => getTechnologies())
    //   .then(() => getLanguages())
    //   .then(() => getExperiences())
    //   .then(() => getProjects())
    //   .then(() => getEducations())
    //   .then(() => {
    //     setTimeout(() => {
    //       setIsLoaded((isLoaded) => (isLoaded = true));
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     setErrorMessage((errorMessage) => (errorMessage = err.message));
    //   });

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
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <NavigationBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.contents}>
        <div className={styles.justify}>
          <div className={styles.aboutMe}>
            <span style={{ fontSize: "40%" }}>Hey there, my name is</span>
            <span style={{ display: "block" }}>Chan Wei Jie</span>
            <p style={{ fontSize: "30%" }}>
              I am a fresh grad currently working as a software engineer
              specialized in developing full stack applications. Currently I am
              working on a government defense project at NCS.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className={styles.contents}>
        <div className={styles.justify}>
          <p style={{ fontSize: "30%", textAlign: "left" }}>
            One of my most recent project that I have accomplished is an
            Inventory Management System
          </p>
        </div>
        <img src={aubercot} height={"60%"} />
      </div>
      <div className={styles.contents}>
        <Frameworks />
      </div>
      <div className={styles.contents}>
        <Languages />
      </div>
      <div className={styles.contents}>
        <Experiences />
      </div>
      <div className={styles.contents}>
        <Projects />
      </div>
      <div className={styles.contents}>
        <Educations />
      </div>
    </div>
  );
}
