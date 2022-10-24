// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./ContactMe.module.css";
import { useInView } from "react-intersection-observer";

const ContactMe = () => {
  const { ref: cardRef, inView: cardView, entry: cardEntry } = useInView();

  const [observer, setObserver] = useState(false);

  const sendMail = () => {
    location.href = "mailto:chan_weijie@outlook.com";
  };

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
          Get in touch with me!
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
        <button
          className={[
            styles.description,
            observer ? styles.animation : "",
          ].join(" ")}
          onClick={() => sendMail()}
        >
          Say Hello
        </button>
      </div>
    </div>
  );
};

export default ContactMe;
