import { Button } from "primereact/button";
import { FC, useEffect, useState, useRef, useMemo, useContext } from "react";
import { onLogout } from "../auth/actions";
import { Tooltip } from "primereact/tooltip";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import "./HomePage.css";
import AuthenticationContext from "../../store/authentication-content";

const HomePage: FC = () => {
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

  return (
    <main className="default-container">
      <section className="header">
        <h1>Dashboard</h1>
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
