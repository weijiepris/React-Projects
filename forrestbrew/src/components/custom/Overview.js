import React, { useContext, useEffect, useState } from "react";
import classes from "./custom.module.css";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
const Overview = () => {
  const ctx = useContext(AuthContext);

  const [filter, setFilter] = useState("hotel");
  const [details, setDetails] = useState([]);
  const [temp, setTemp] = useState("");
  useEffect(() => {
    // console.log(ctx);
  });
  const getDate = (date) => {
    if (date === null) {
      return 0;
    } else {
      return new Date(date["seconds"] * 1000).toString().substring(4, 15);
    }
  };
  const convertDate = (date) => {
    if (date === null) {
      return 0;
    } else {
      return new Date(date).toString().substring(4, 15);
    }
  };

  const viewDetails = (key, type) => {
    if (temp === key) {
      setDetails([]);
      setTemp("");
    } else {
      if (type === "fermentation") {
        ctx.fermentation.forEach((d) => {
          if (d.key === key) {
            setDetails(d);
          }
        });
      }
      if (type === "hotel") {
        ctx.hotel.forEach((d) => {
          if (d.key === key) {
            setDetails(d);
          }
        });
      }
      setTemp(key);
    }
  };

  const Hotel = () => {
    return (
      <table>
        <tr>
          <th>Batch Number</th>
          <th>Litres</th>
          <th>Last Updated</th>
        </tr>
        {ctx.hotel.map((list) => (
          <tr
            key={list.key}
            className={classes.trow}
            onClick={() => viewDetails(list.key, "hotel")}
          >
            <td>{list.batchNo}</td>
            <td>{list.amount}</td>
            <td>{getDate(list.lastUpdate)}</td>
          </tr>
        ))}
      </table>
    );
  };
  const Fermentation = () => {
    return (
      <table>
        <tr>
          <th>Batch Number</th>
          <th>Litres</th>
          <th>Last Updated</th>
        </tr>
        {ctx.fermentation.map((list) => (
          <tr
            key={list.key}
            className={classes.trow}
            onClick={() => viewDetails(list.key, "fermentation")}
          >
            <td>{list.batchNo}</td>
            <td>{list.amount}</td>
            <td>{getDate(list.lastUpdate)}</td>
          </tr>
        ))}
      </table>
    );
  };

  const setFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  const ShowDetails = () => {
    return (
      <div>
        <tr>
          <td>{details.batchNo}</td>
          <td>{details.amount}</td>
          <td>{details.amount}</td>
          <td>{getDate(details.lastUpdate)}</td>
          <td>{convertDate(details.dateCreated)}</td>
        </tr>
      </div>
    );
  };
  return (
    <div className={classes.container} id="container">
      <span className={classes.overview}>Overview</span>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.actions}>
          <br />
          <Link to="/Hotel">
            <button>Create New Hotel</button>
          </Link>
          <br />
          <br />
          <Link to="/Fermentation">
            <button>Create New Fermentation</button>
          </Link>
          <br />
          <br />
        </div>
      </div>
      <br />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.gridContent}>
            <div className={classes.tableParent}>
              <br />
              <select
                id="leftPanel"
                name="leftPanel"
                className={classes.input}
                onChange={setFilterHandler}
              >
                <option value="hotel">Hotel</option>
                <option value="fermentation">Fermentation</option>
              </select>
              <div className={classes.gridContent}>
                {filter === "hotel" ? <Hotel /> : <Fermentation />}
              </div>
            </div>
          </div>
          <div className={classes.gridContent}>
            {details.length !== 0 ? <ShowDetails /> : <div>Please select an item</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
