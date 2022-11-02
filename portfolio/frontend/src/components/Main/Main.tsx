// @ts-nocheck
import React, { useEffect, useState } from "react";
import NavigationBar from "../Navigation/NavigationBar.tsx";
import styles from "./Main.module.css";
import wjwhite from "../../image/specs whte.svg";
import aubercot from "../../image/aubercot.png";
import {
  loadDefault,
  getFrameworks,
  getEducations,
  getTechnologies,
  getLanguages,
  getExperiences,
  getProjects,
} from "../../actions/service.tsx";

import Experience from "../Experience/Experience.tsx";
import Introduction from "../Introduction/Introduction.tsx";
import AboutMe from "../AboutMe/AboutMe.tsx";
import ContactMe from "../ContactMe/ContactMe.tsx";
import Footer from "../Footer/Footer.tsx";

const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
    // setIsLoaded((isLoaded: boolean) => (isLoaded = true));
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
        setIsLoaded((isLoaded: boolean) => (isLoaded = true));
      }, 1000);
    } catch (err) {
      setErrorMessage(err.code + ": " + err.message);
    }
  };

  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <NavigationBar isLoaded={isLoaded} />
        <div className={styles.loadingContent}>
          <div className={styles.blurDiv}></div>
          <img src={wjwhite} className={styles.loading} />
          <span style={{ position: "relative", top: "18px", left: "9px" }}>
            {errorMessage}
          </span>
        </div>
      </div>
    );
  }

  const intro = {
    title: "Hey there, my name is",
    header: "Chan Wei Jie",
    bio: "I develop ideas to make one's life easier",
    description:
      "I'm a fresh graduate from University Of Wollongong and currently working as a Software Engineer specialized in developing full stack applications.",
  };

  const about = {
    title: "About Me",
    description:
      "My name is Chan Wei Jie, sometimes my colleagues like to call me Jay for short. " +
      "My interest for programming started back when I was 17, I was a student at ITE (Simei). " +
      "In the year of 2021, I chanced upon an opportunity in developing an Inventory Management System for a client.",
    technology: [
      "React",
      "Node Js",
      "Angular",
      "Firebase (Firestore and Hosting)",
    ],
  };

  return (
    <div className={styles.container}>
      <NavigationBar />
      <Introduction data={intro} />
      <AboutMe data={about} />
      <Experience title={"Where I've worked"} experiences={experiences} />
      <ContactMe id="contact"/>
      <Footer />
    </div>
  );
};

export default Main;
