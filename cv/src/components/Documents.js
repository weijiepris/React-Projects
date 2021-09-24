import React, { useState } from "react";
import classes from "./css/AboutMe.module.css";

import diplomacert from "../image/diplomacert.jpg";
import diplomatranscript from "../image/diplomatranscript.jpg";
import itecert from "../image/itecert.jpg";
import itetranscript from "../image/itetranscript.jpg";
import nscert from "../image/nscert.jpg";
import nstranscript from "../image/nstranscript.jpg";

import ViewImage from "./ViewImage";
const Documents = () => {
  const [overlay, setOverlay] = useState(false);
  const [image, setImage] = useState();

  const hideOverlay = () => {
    setOverlay(false);
  };

  const setDipCert = () => {
    openList(diplomacert);
  };
  const setDipTranscript = () => {
    openList(diplomatranscript);
  };
  const setIteCert = () => {
    openList(itecert);
  };
  const setIteTranscript = () => {
    openList(itetranscript);
  };
  const setNSCert = () => {
    openList(nscert);
  };
  const setNSTranscript = () => {
    openList(nstranscript);
  };
  const openList = (image) => {
    setImage(image);
    showOverlay();
  };

  const showOverlay = () => {
    setOverlay(true);
  };

  return (
    <div className={classes.container}>
      {overlay && <ViewImage onClose={hideOverlay} image={image} />}
      <div className={classes.content}>
        <div className={classes.header}>
          Diploma Certificate &amp; Transcript
        </div>
        <br />
        <p>
          <img
            className={classes.portImage}
            src={diplomacert}
            onClick={setDipCert}
          />
          <img
            className={classes.portImage}
            src={diplomatranscript}
            onClick={setDipTranscript}
          />
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>Nitec Certificate &amp; Transcript</div>
        <br />
        <p>
          <img
            className={classes.portImage}
            src={itecert}
            onClick={setIteCert}
          />
          <img
            className={classes.portImage}
            src={itetranscript}
            onClick={setIteTranscript}
          />
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className={classes.header}>
          National Service Certificate &amp; Transcript
        </div>
        <br />
        <p>
          <img className={classes.portImage} src={nscert} onClick={setNSCert} />
          <img
            className={classes.portImage}
            src={nstranscript}
            onClick={setNSTranscript}
          />
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Documents;
