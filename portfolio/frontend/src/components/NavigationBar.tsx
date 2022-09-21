// @ts-nocheck
import React from "react";
import styles from "./NavigationBar.module.css";
import wjwhite from "../image/specs whte.svg";

export default function NavigationBar({ isLoaded }) {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-200px";
    }
    prevScrollpos = currentScrollPos;

    setTimeout(() => {
      if (currentScrollPos === 0) {
        document.getElementById("navbar").style.boxShadow = "none";
      } else {
        document.getElementById("navbar").style.boxShadow =
          "0px 1px 10px black";
      }
    }, 100);
  };

  return (
    <div id="navbar" className={styles.navigationBar}>
      {isLoaded ?? (
        <ul>
          <div className={styles.logoContainer}>
            <img src={wjwhite} className={styles.logo} />
          </div>
          <div className={styles.navigations}>
            <li>About</li>
            <li>Experience</li>
            <li>Work</li>
            <li>Contact</li>
            <li>Resume</li>
          </div>
        </ul>
      )}
    </div>
  );
}
