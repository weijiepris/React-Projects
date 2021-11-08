import React, { useState, useRef } from "react";
import classes from "./misc.module.css";
const DateChecker = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const dateRef = useRef();
  const daysRef = useRef();

  const getExpire = (date, day) => {
    console.log(date);
    let d = new Date(date);
    console.log(d);
    d.setDate(d.getDate() + parseInt(day));
    // return d.toString().substring(4, 15);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  const computeDate = (event) => {
    event.preventDefault();
    const date =
      yearRef.current.value +
      "-" +
      monthRef.current.value +
      "-" +
      dayRef.current.value;
    const day = daysRef.current.value;
    setErrorMessage("Date: " + getExpire(date, day));
  };

  const today = () => {
    let d = new Date();
    console.log(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  };
  const getYear = () => {
    let d = new Date();
    return d.getFullYear();
  };

  const getMonth = () => {
    let d = new Date();
    return d.getMonth() + 1;
  };

  const getDay = () => {
    let d = new Date();
    return d.getDate();
  };
  const resetInput = () => {
    document.getElementById("getDay").value = getDay();
    document.getElementById("getMonth").value = getMonth();
    document.getElementById("getYear").value = getYear();
    document.getElementById("days").value = "";
  };

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Date Checker</span>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <form onSubmit={computeDate}>
            <input
              id="getDay"
              type="number"
              placeholder="Day"
              className={classes.inputS}
              defaultValue={getDay()}
              ref={dayRef}
            />
            <input
              id="getMonth"
              type="number"
              placeholder="Month"
              className={classes.inputS}
              defaultValue={getMonth()}
              ref={monthRef}
            />
            <input
              id="getYear"
              type="number"
              placeholder="Year"
              className={classes.inputS}
              defaultValue={getYear()}
              ref={yearRef}
            />

            <br />
            <input
              id="days"
              type="number"
              placeholder="Number of days (e.g. 10)"
              className={classes.input}
              ref={daysRef}
              required
            />
            <br />
            <button className={classes.input}>Get Date</button>
          </form>
          <button onClick={resetInput} className={classes.input}>
            Reset Input
          </button>
          <br />
          <br />
          <span>{errorMessage}</span>
          <br />
          <br />
          <div className={classes.gridBox}>
            <div style={{ visibility: "hidden" }}></div>
            <div>
              <h1>30 Days</h1>
              <h2>{getExpire(today(), 30)}</h2>
            </div>
            <div>
              <h1>60 Days</h1>
              <h2>{getExpire(today(), 60)}</h2>
            </div>
            <div>
              <h1>90 Days</h1>
              <h2>{getExpire(today(), 90)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateChecker;
