import axios from "axios";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [res, setRes] = useState("Clear");

  const test1 = () => {
    console.log("test1", a);
  };

  console.log(a);
  test1();
  test2();
  var a = 1;

  function test2() {
    console.log("test2", a);
  }

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    try {
      const res = await axios.get("http://localhost:3001/");

      if (res.status === 200) {
        setRes(res.data.message);
      }
    } catch {}
  };

  return <div>Main {res}</div>;
};

export default Main;
