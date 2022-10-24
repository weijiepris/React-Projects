// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./Experience.module.css";
import { useInView } from "react-intersection-observer";

const Experience = ({ title, experiences }) => {
  const { ref: cardRef, inView: cardView, entry: cardEntry } = useInView();

  const [observer, setObserver] = useState(false);

  experiences.sort((a, b) => {
    let aa = new Date(a.dateStart);
    let bb = new Date(b.dateStart);
    return bb.getTime() - aa.getTime();
  });

  useEffect(() => {
    if (cardView) {
      setObserver(true);
    }
  }, [cardView]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={[styles.title, observer ? styles.animation : ""].join(" ")}>{title}</div>
        <div ref={cardRef}>
          {experiences.map((experience) => (
            <div className={styles.experienceContainer} key={experience.dateEnd}>
              <p className={[styles.duration, observer ? styles.animation2 : ""].join(" ")}>
                {experience.company} - ({experience.category.toUpperCase()}){" "}
                <br /> ({experience.dateStart} - {experience.dateEnd})
              </p>
              {experience.descriptions.map((desc) => (
                <p className={[styles.description, observer ? styles.animation2 : ""].join(" ")}>{desc}</p>
              ))}
              <br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
