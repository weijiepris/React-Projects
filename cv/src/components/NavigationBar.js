import React, { useState } from "react";
import classes from "./css/NavigationBar.module.css";
// import image from "../image/face.jpg";
import body from "../image/body.jpg";
import actualbody from "../image/actualbody.jpg";
import { Link } from "react-router-dom";
import { FaGithubSquare } from "@react-icons/all-files/fa/FaGithubSquare";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaMailBulk } from "@react-icons/all-files/fa/FaMailBulk";
import ViewImage from "./ViewImage";

function NavigationBar() {
  const [overlay, setOverlay] = useState(false);
  const [image, setImage] = useState();
  const openList = (image) => {
    setImage(image);
    showOverlay();
  };

  const hideOverlay = () => {
    setOverlay(false);
  };
  const showOverlay = () => {
    setOverlay(true);
  };

  const setBody = () => {
    openList(actualbody);
  };

  return (
    <React.Fragment>
      <div className={classes.sidenav}>
        {overlay && <ViewImage onClose={hideOverlay} image={image} />}
        <br></br>
        <br></br>
        {/* <Link
          to="/"
          exact="true"
          style={{ textDecoration: "none", marginTop: "none" }}
        > */}
        <div className={classes.photo}>
          <img src={body} alt="profile" onClick={setBody} />
        </div>
        {/* </Link> */}
        <br></br>
        <div className={classes.head}>
          <Link
            to="/"
            exact="true"
            style={{ textDecoration: "none", marginTop: "none" }}
          >
            <h1>Chan Wei Jie</h1>
          </Link>
          <p>
            +65 9616 4636 <br />
            <br />
            Front-end <br />
            Back-end Developer
          </p>
          <br></br>
        </div>
        <div className={classes.a}>
          <Link
            to="/"
            exact="true"
            style={{ textDecoration: "none", color: "white" }}
          >
            About Me
          </Link>
        </div>
        <div className={classes.a}>
          <Link
            to="/Projects"
            exact="true"
            style={{ textDecoration: "none", color: "white" }}
          >
            Projects
          </Link>
        </div>
        <div className={classes.a}>
          <Link
            to="/Experience"
            exact="true"
            style={{ textDecoration: "none", color: "white" }}
          >
            Experience
          </Link>
        </div>
        <div className={classes.a}>
          <Link
            to="/Skills"
            exact="true"
            style={{ textDecoration: "none", color: "white" }}
          >
            Skills
          </Link>
        </div>
        <div className={classes.a}>
          <Link
            to="/Education"
            exact="true"
            style={{ textDecoration: "none", color: "white" }}
          >
            Education
          </Link>
        </div>
        <div className={classes.last}>
          <Link
            to="/Documents"
            exact="true"
            style={{ textDecoration: "none", color: "white" }}
          >
            Documents
          </Link>
        </div>

        <br></br>
        <div className={classes.social}>
          <a
            href="mailto:chan_weijie@outlook.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaMailBulk size="30" color="#a4b3c4" className={classes.test} />
          </a>

          <a
            href="https://github.com/weijiepris"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithubSquare
              size="30"
              color="#a4b3c4"
              className={classes.test}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/cweijie/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin size="30" color="#a4b3c4" className={classes.test} />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavigationBar;
