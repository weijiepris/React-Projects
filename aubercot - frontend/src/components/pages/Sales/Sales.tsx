import { FC } from "react";

interface Props {
  alert: Function;
}
const Sales: FC<Props> = () => {
  return (
    <main className="section-container">
      <section className="header">
        <h1>Sales</h1>
      </section>
      <section className="section"></section>
      <section className="section"></section>
    </main>
  );
};

export default Sales;
