import React, { useState, useRef } from "react";
import classes from "./misc.module.css";
const DateChecker = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dateRef = useRef();
  const daysRef = useRef();

  const getExpire = (date, day) => {
    let d = new Date(date);
    d.setDate(d.getDate() + parseInt(day));
    // return d.toString().substring(4, 15);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  const computeDate = (event) => {
    event.preventDefault();
    const date = dateRef.current.value;
    const day = daysRef.current.value;
    setErrorMessage("Date: " + getExpire(date, day));
  };

  const today = () => {
    let d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  };

  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Date Checker</span>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <form onSubmit={computeDate}>
            <input
              id="datePicker"
              type="date"
              className={classes.input}
              defaultValue={today()}
              ref={dateRef}
            />

            <br />
            <input
              type="number"
              placeholder="Number of days (e.g. 10)"
              className={classes.input}
              ref={daysRef}
              required
            />
            <br />
            <button className={classes.input}>Get Date</button>
          </form>
          <br />
          <br />
          <span>{errorMessage}</span>
          {/* {data.map((e) => (
            <div>{e.name}</div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default DateChecker;
