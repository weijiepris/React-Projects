// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import { useInView } from "react-intersection-observer";

const Projects = ({ data }) => {
  const { ref: cardRef, inView: cardView, entry: cardEntry } = useInView();

  const [observer, setObserver] = useState(false);

  useEffect(() => {
    if (cardView) {
      setObserver(true);
    }
  }, [cardView]);

  return (
    <section className={styles.container} id="project">
      <div className={styles.content}>
        <div
          className={[styles.title, observer ? styles.animation : ""].join(" ")}
        >
          {data.title}
        </div>
        <div
          className={[
            styles.description,
            observer ? styles.animation : "",
          ].join(" ")}
          ref={cardRef}
        >
          My inbox is always open for collaborations, opportunities, questions
          and more!
        </div>
      </div>
    </section>
  );
};

export default Projects;
