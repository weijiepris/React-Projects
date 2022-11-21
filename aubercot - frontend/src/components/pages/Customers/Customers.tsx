import { FC } from "react";

interface Props {
  alert: Function;
}
const Customers: FC<Props> = () => {
  return (
    <main className="section-container">
      <section className="header">
        <h1>Customers</h1>
      </section>
      <section className="section"></section>
      <section className="section"></section>
    </main>
  );
};

export default Customers;
