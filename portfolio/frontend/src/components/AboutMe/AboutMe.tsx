// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./AboutMe.module.css";
import { useInView } from "react-intersection-observer";

const AboutMe = ({ data }) => {
  const { ref: cardRef, inView: cardView, entry: cardEntry } = useInView();

  const [observer, setObserver] = useState(false);

  useEffect(() => {
    if (cardView) {
      setObserver(true);
    }
  }, [cardView]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={[styles.title, observer ? styles.animation : ""].join(" ")}
        >
          {data.title}
        </div>
        <div
          className={[
            styles.description,
            observer ? styles.animation1 : "",
          ].join(" ")}
        >
          {data.description}
        </div>
        <p
          className={[
            styles.description,
            observer ? styles.animation2 : "",
          ].join(" ")}
        >
          These are the technologies that I've been working on
        </p>
        <ul
          ref={cardRef}
          className={[styles.technology, observer ? styles.animation3 : ""].join(
            " "
          )}
        >
          {data.technology.map((tech: any) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
