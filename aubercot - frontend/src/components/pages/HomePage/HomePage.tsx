import "./HomePage.css";

import axios from "axios";
import AuthenticationContext from "../../../store/authentication-content";

import { FC, useContext } from "react";
import { Tooltip } from "primereact/tooltip";
import { Chart } from "primereact/chart";
import { BreadCrumb } from "primereact/breadcrumb";

interface Props {
  alert: Function;
}
const HomePage: FC<Props> = () => {
  const authenticationContext = useContext(AuthenticationContext);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#4bc0c0",
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#565656",
      },
    ],
  };

  const test = () => {
    axios
      .get(`http://localhost:3002/skills`, {
        headers: {
          Authorization: "Bearer " + authenticationContext.userToken,
        },
      })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="section-container">
      <section className="header">
        <h1>Dashboard</h1>
        <button onClick={test}>Test button</button>
      </section>
      <section className="section-summary section">
        <div className="summary-items">
          <div>Products</div>
          <div>0</div>
        </div>
        <div className="summary-items" data-pr-tooltip={"test"}>
          <div className="profits">Profits</div>
          <div>$0.00</div>
        </div>
      </section>
      <section className="section-charts section">
        <div className="charts-grid-content">
          <div className="charts-grid">
            <Chart type="line" data={data} className="charts" />
          </div>
          <div className="charts-grid">
            <Chart type="line" data={data} className="charts" />
          </div>
        </div>
      </section>
      <section className="section-etc section">
        <div className="charts-grid-content">
          <div className="charts-grid">
            <Chart type="bar" data={data} className="charts" />
          </div>
          <div className="charts-grid">
            <Chart type="line" data={data} className="charts" />
          </div>
        </div>
      </section>
      <Tooltip target=".summary-items" mouseTrack mouseTrackLeft={10} />
    </main>
  );
};

export default HomePage;
