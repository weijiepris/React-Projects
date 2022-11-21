import { resolvePath } from "react-router-dom";

const TestPromise = () => {
  const testPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello there");
    }, 1000);
  });

  testPromise
    .then((val) => {
      console.log("succ1", val);
      return val;
    })
    .then((val) => {
      console.log("succ2", val);
      return val + "1";
    })
    .then((val) => {
      console.log("succ3", val);
      return val + "2";
    })
    .then((val) => {
      console.log("succ4", val);
      return val + "3";
    })
    .then((val) => {
      console.log("succ5", val);
      return val + "5";
    })
    .then((val) => {
      console.log("succ6", val);
    })
    .catch((err) => {
      console.log("err", err);
    });

  return <div>test promise</div>;
};

export default TestPromise;
