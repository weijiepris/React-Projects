// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { useInView } from "react-intersection-observer";

const Card = ({ title, bigHeader, smallHeader, description }) => {
  const { ref: cardRef, inView: cardView, entry: cardEntry } = useInView();

  const [titleView, setTitleView] = useState(false);
  const [bigHeaderView, setBigHeaderView] = useState(false);
  const [smallHeaderView, setSmallHeaderView] = useState(false);
  const [descriptionView, setDescriptionView] = useState(false);

  useEffect(() => {
    if (cardView) {
      setTitleView(true);
      setBigHeaderView(true);
      setSmallHeaderView(true);
      setDescriptionView(true);
    }
  }, [cardView]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={[
            styles.title,
            titleView ? styles.titleAnimation : "",
          ].join(" ")}
          id="title"
        >
          {title}
        </div>
        <div
          className={[
            styles.bigHeader,
            bigHeaderView ? styles.bigHeaderAnimation : "",
          ].join(" ")}
          id="bigHeader"
        >
          {bigHeader}
        </div>
        <div
          ref={cardRef}
          className={[
            styles.smallHeader,
            smallHeaderView ? styles.smallHeaderAnimation : "",
          ].join(" ")}
          id="smallHeader"
        >
          {smallHeader}
        </div>
        <div
          className={[
            styles.description,
            descriptionView ? styles.descriptionAnimation : "",
          ].join(" ")}
          id="description"
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default Card;
