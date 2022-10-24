// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Introduction.module.css";

const Introduction = ({ data }) => {
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
        <div className={[styles.title, observer ? styles.animation : ""].join(" ")}>{data.title}</div>
        <div className={[styles.header, observer ? styles.animation1 : ""].join(" ")}>{data.header}</div>
        <div className={[styles.bio, observer ? styles.animation2 : ""].join(" ")}>{data.bio}</div>
        <div ref={cardRef} className={[styles.description, observer ? styles.animation3 : ""].join(" ")}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
