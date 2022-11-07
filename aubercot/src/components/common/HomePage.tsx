import { Button } from "primereact/button";
import { FC, useEffect, useState, useRef, useMemo, useContext } from "react";
import { onLogout } from "../auth/actions";
import { Tooltip } from "primereact/tooltip";
import { Card } from "primereact/card";

import "./HomePage.css";
import AuthenticationContext from "../../store/authentication-content";

const HomePage: FC = () => {
  return (
    <main className="default-container">
      <section>
        <h1>Dashboard</h1>
      </section>
      <section className="section-summary section">
        <div className="items">
          <div>Products</div>
          <div>0</div>
        </div>
        <div className="items" data-pr-tooltip={"test"}>
          <div className="profits">Profits</div>
          <div>$0.00</div>
        </div>
      </section>
      <section className="section-charts section"></section>
      <section className="section-etc section"></section>
      <Tooltip target=".items" mouseTrack mouseTrackLeft={10} />
    </main>
  );
};

export default HomePage;
