import { useRef, useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./Login.module.css";

import AuthContext from "../../store/auth-context";

const Login = () => {
  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onSignin = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    ctx.onLogin(enteredEmail, enteredPassword);
  };

  const summary = [
    {
      data: [
        {
          date: "Sep 21 2021",
          prodID: "005",
        },
      ],
    },
    {
      data: [
        {
          date: "Sep 21 2021",
          prodID: "002",
        },
        {
          date: "Sep 21 2021",
          prodID: "002",
        },
        {
          date: "Sep 21 2021",
          prodID: "002",
        },
        {
          date: "Sep 21 2021",
          prodID: "002",
        },
        {
          date: "Sep 21 2021",
          prodID: "002",
        },
        {
          date: "Sep 21 2021",
          prodID: "002",
        },
      ],
    },
    {
      data: [
        {
          date: "Sep 21 2021",
          prodID: "006",
        },
        {
          date: "Sep 21 2021",
          prodID: "006",
        },
        {
          date: "Sep 21 2021",
          prodID: "006",
        },
      ],
    },
    {
      data: [
        {
          date: "Sep 21 2021",
          prodID: "001",
        },
        {
          date: "Sep 21 2021",
          prodID: "001",
        },
        {
          date: "Sep 21 2021",
          prodID: "001",
        },
      ],
    },
    {
      data: [
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
        {
          date: "Sep 21 2021",
          prodID: "000",
        },
      ],
    },
    {
      data: [
        {
          date: "Sep 21 2021",
          prodID: "004",
        },
        {
          date: "Sep 21 2021",
          prodID: "004",
        },
        {
          date: "Sep 21 2021",
          prodID: "004",
        },
        {
          date: "Sep 19 2021",
          prodID: "004",
        },
        {
          date: "Sep 19 2021",
          prodID: "004",
        },
      ],
    },
  ];
  const test = () => {
    // summary.map((list) => console.log(list.data));

    // for (const i in summary) {
    // console.log(summary[i].data);
    let t = [];
    let y = [];
    let tc = 0;
    for (let i = 0; i < summary.length; i++) {
      console.log("test => ", summary[i].data);

      for (let k = 0; k < summary[i].data.length; k++) {
        if (Object.values(t).indexOf(summary[i].data[k].date) > -1) {
          console.log("have", summary[i].data[k].date);
          for (let j = 0; j <= y.length; j++) {
            console.log("in");
            if (t[j] === summary[i].data[k].date) {
              console.log("increase counter for index ", j);
              if (!y[j]) {
                console.log("creating new index");
                y[j] = 1;
              } else {
                y[j] += 1;
              }
            }
          }
        } else {
          console.log("does not have", summary[i].data[k].date);
          t[tc] = summary[i].data[k].date;
          y[tc] = 1;
          tc++;
        }
      }
    }
    console.log(t);
    console.log(y);
  };
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={onSignin}>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="E-Mail"
            required
            ref={emailInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.control}>{ctx.errorMessage}</div>
        <div className={classes.actions}>
          {!ctx.loading ? <button>Login</button> : <p>Loading...</p>}
        </div>
        <div className={classes.register}>
          Don't have an account?{" "}
          <Link to="/register">Click Here to sign up</Link>
        </div>

        <div onClick={test}>test</div>
      </form>
    </section>
  );
};

export default Login;
