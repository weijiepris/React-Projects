import { FC } from "react";

interface Props {
  alert: Function;
}
const Suppliers: FC<Props> = () => {
  return (
    <main className="section-container">
      <section className="header">
        <h1>Suppliers</h1>
      </section>
      <section className="section"></section>
      <section className="section"></section>
    </main>
  );
};

export default Suppliers;
