// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import wjwhite from "../../image/specs whte.svg";
import resume from "./resume2.pdf";
import { Link } from "react-scroll";
const NavigationBar = ({ isLoaded }) => {
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

  const test = () => {
    const anchor = document.querySelector("contact");
    console.log(anchor);
    anchor?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {isLoaded ??
        (!isMobile ? (
          <nav id="navbar" className={styles.navigationBar}>
            <ul>
              <div
                className={[styles.logoContainer, styles.appearAnimation].join(
                  " "
                )}
              >
                <Link activeClass="active" smooth spy to="about">
                  <img src={wjwhite} className={styles.logo} />
                </Link>
              </div>
              <div className={styles.navigations}>
                <li>
                  <Link activeClass="active" smooth spy to="about">
                    About
                  </Link>
                </li>
                <li>
                  <Link activeClass="active" smooth spy to="experience">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link activeClass="active" smooth spy to="contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href={resume}
                    target="_blank"
                  >
                    Resume
                  </a>
                </li>
              </div>
            </ul>
          </nav>
        ) : (
          <nav className={styles.mobileNavigationBar}>
            <header className={styles.header}>
              <div className={styles.nav} id="nav">
                <div>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="about"
                    onClick={showHide}
                  >
                    About
                  </Link>
                </div>
                <div>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="about"
                    onClick={showHide}
                  >
                    Experience
                  </Link>
                </div>
                <div>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="contact"
                    onClick={showHide}
                  >
                    Contact
                  </Link>
                </div>
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
          </nav>
        ))}
    </>
  );
};

export default NavigationBar;
