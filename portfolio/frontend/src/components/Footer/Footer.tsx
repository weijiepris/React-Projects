//@ts-nocheck

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Footer.module.css";

const Footer = () => {
  const { ref: cardRef, inView: cardView, entry: cardEntry } = useInView();

  const [observer, setObserver] = useState(false);
  useEffect(() => {
    if (cardView) {
      setObserver(true);
    }
  }, [cardView]);

  return (
    <footer>
      <div className={styles.content}>Designed and developed by Chan Wei Jie</div>
    </footer>
  );
};
export default Footer;
