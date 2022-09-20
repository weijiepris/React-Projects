// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar.tsx";
import styles from "./Main.module.css";
import { Skills, Experiences, Educations, Projects } from "../model/model";

export default function HomePage() {
  const [frameworks, setFrameworks] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);

  // const url = "https://us-central1-portfolio-v2-b469e.cloudfunctions.net/app/";
  const url = "http://localhost:3001/";
  

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

  const loadDefault = () => {
    axios.get(url).then((res) => res.data);
  };

  useEffect(() => {
    loadDefault();
    getFrameworks();
    getTechnologies();
    getLanguages();
    getExperiences();
    getProjects();
    getEducations();

    return () => {
      setFrameworks([]);
      setTechnologies([]);
      setLanguages([]);
      setExperiences([]);
      setProjects([]);
      setEducations([]);
      console.log("clean up in main");
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

  return (
    <div className={styles.container}>
      <NavigationBar />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      Main page
      <Frameworks />
      <Languages />
      <Experiences />
      <Projects />
      <Educations />
    </div>
  );
}
