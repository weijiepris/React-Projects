import React, { useRef, useState } from "react";
import classes from "./inventory.module.css";

// import Chart from "react-google-charts";
const Checker = () => {
  const outRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (event) => {
    setErrorMessage("");
  };
  const scanIn = (event) => {
    event.preventDefault();
    const outValue = outRef.current.value;
    // console.log(outValue);

    if (outValue.includes("`")) {
      // /$FB/001$fb/27/10/21$Fb/apple-ginger$fB/
      var str = outValue;
      // console.log(str);
      var res = str.split("`");
      // console.log(res);
      if (res.length === 2) {
        if (
          res[0].replaceAll(" ", "").length > 1 &&
          res[1].replaceAll(" ", "").length > 1
        ) {
          let prodID = res[0];
          let batchNo = res[1];
          let prodName = res[2];
          document.getElementById("label").innerHTML =
            "Prod ID = " +
            prodID +
            " <br>batchNo = " +
            batchNo +
            " <br>prodName = " +
            prodName +
            " <br>qr code value = " +
            str;
        } else {
          setErrorMessage("Invalid data entered");
        }
      } else {
        setErrorMessage("Invalid data entered");
      }
    } else {
      setErrorMessage("Invalid data entered");
    }
    outRef.current.value = "";
  };
  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>QR Code Checker</span>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <form onSubmit={scanIn}>
            <input
              type="text"
              placeholder="SCAN QR CODE"
              ref={outRef}
              onChange={onChange}
              className={classes.input}
            />
          </form>
          <label id="label">{errorMessage}</label>
        </div>
      </div>
    </div>
  );
};

export default Checker;
