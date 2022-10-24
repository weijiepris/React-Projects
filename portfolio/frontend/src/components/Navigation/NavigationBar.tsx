// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import wjwhite from "../../image/specs whte.svg";

export default function NavigationBar({ isLoaded }) {
  const [isMobile, setIsMobile] = useState(false);
  const [toggle, setToggle] = useState(false);

  const showHide = () => {
    setToggle(!toggle);
    var x = document.getElementById("nav");
    if (toggle) {
      x.style.height = "0";
      x.style.display = "none";
    } else {
      x.style.height = "600px";
      x.style.display = "block";
    }
  };

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (isMobile) {
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("iconHolder").style.top = "10px";
      } else {
        document.getElementById("iconHolder").style.top = "-200px";
      }
      prevScrollpos = currentScrollPos;
    } else {
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-200px";
      }
      prevScrollpos = currentScrollPos;

      setTimeout(() => {
        if (currentScrollPos < 0) {
          document.getElementById("navbar").style.boxShadow = "none";
        } else {
          document.getElementById("navbar").style.boxShadow =
            "0px 1px 10px black";
        }
      }, 100);
    }
  };

  window.onresize = () => {
    if (window.innerWidth <= 962) setIsMobile(true);
    else setIsMobile(false);
  };

  useEffect(() => {
    if (window.innerWidth <= 962) setIsMobile(true);
    else setIsMobile(false);
  }, [isMobile]);

  return (
    <>
      {isLoaded ??
        (!isMobile ? (
          <div id="navbar" className={styles.navigationBar}>
            <ul>
              <div
                className={[styles.logoContainer, styles.appearAnimation].join(
                  " "
                )}
              >
                <img src={wjwhite} className={styles.logo} />
              </div>
              <div className={styles.navigations}>
                <li>About</li>
                <li>Experience</li>
                <li>Contact</li>
                <li>Resume</li>
              </div>
            </ul>
          </div>
        ) : (
          <div className={styles.mobileNavigationBar}>
            <header className={styles.header}>
              <div className={styles.nav} id="nav">
                <div>About Me</div>
                <div>Education</div>
                <div>Experience</div>
                <div>Projects</div>
                <div>Skills</div>
                <div>Documents</div>
              </div>
              <div
                className={styles.iconHolder}
                onClick={showHide}
                id="iconHolder"
              >
                <div
                  className={[styles.icon, toggle ? styles.change : ""].join(
                    " "
                  )}
                >
                  <div className={styles.bar1}></div>
                  <div className={styles.bar2}></div>
                  <div className={styles.bar3}></div>
                </div>
              </div>
            </header>
          </div>
        ))}
    </>
  );
}
