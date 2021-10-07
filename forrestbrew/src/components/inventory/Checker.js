import React, { useRef, useState } from "react";
import classes from "./inventory.module.css";

const Checker = () => {
  const outRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (event) => {
    setErrorMessage("");
  };
  const scanIn = (event) => {
    event.preventDefault();
    const outValue = outRef.current.value;
    console.log(outValue);

    if (
      outValue.includes("/$FB/") &&
      outValue.includes("$fb/") &&
      outValue.includes("$Fb/") &&
      outValue.includes("$fB/")
    ) {
      // /$FB/001$fb/27/10/21$Fb/apple-ginger$fB/

      var str = outValue;
      // console.log(str);
      var res = str.split("$fB/");
      // console.log(res);
      if (res[1] !== "") {
        setErrorMessage("Invalid data entered");
      } else {
        // console.log("res => ", res);
        var res2 = res[0].split("$fb/");
        // console.log("Res2 => ", res2);

        var res3 = res2[0].split("/$FB/");
        // console.log("res3 => ", res3);

        var res4 = res2[1].split("$Fb/");

        // console.log("res4 => ", res4);

        if (res3[0] === "") {
          let batchNo = res4[0];
          let prodID = res3[1];
          let prodName = res4[1];
          setErrorMessage(
            "Prod ID = " +
              prodID +
              " batchNo = " +
              batchNo +
              " prodName = " +
              prodName
          );
        } else {
          setErrorMessage("Invalid data entered");
        }
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
          <label>{errorMessage}</label>
        </div>
      </div>
    </div>
  );
};

export default Checker;
