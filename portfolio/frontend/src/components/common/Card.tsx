// @ts-nocheck
import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, bigHeader, smallHeader, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.bigHeader}>{bigHeader}</div>
        <div className={styles.smallHeader}>{smallHeader}</div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
