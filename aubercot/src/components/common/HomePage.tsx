import { Button } from "primereact/button";
import { FC, useEffect, useState, useRef, useMemo, useContext } from "react";
import { onLogout } from "../auth/actions";

import "./HomePage.css";
import AuthenticationContext from "../../store/authentication-content";

const HomePage: FC = () => {
  return (
    <main className="default-container">
      <section>
        <h1>Dashboard</h1>
      </section>
      <section className="section-summary">
        <div className="section-summary-grid">Sales</div>
        <div className="section-summary-grid">Products</div>
        <div className="section-summary-grid">Stocks</div>
        <div className="section-summary-grid">Stocks</div>
        <div className="section-summary-grid">Stocks</div>
      </section>
      <section className="section-charts"></section>
      <section className="section-etc"></section>
    </main>
  );
};

export default HomePage;
