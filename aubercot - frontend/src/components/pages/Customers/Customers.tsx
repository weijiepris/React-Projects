import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { FC, useState } from "react";

import "./Customers.css";
import ExistingCustomers from "./ExistingCustomers";

interface Props {
  alert: Function;
}
const Customers: FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <main className="section-container">
      <section className="header">
        <h1>Customers</h1>
      </section>
      <section className="section">
        <div className="customer-buttons">
          <Button
            label="Add New Customer"
            className="p-button-outlined p-button-secondary"
          />
        </div>
      </section>
      <section className="section">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Existing Customers">
            <ExistingCustomers />
          </TabPanel>
        </TabView>
      </section>
    </main>
  );
};

export default Customers;
