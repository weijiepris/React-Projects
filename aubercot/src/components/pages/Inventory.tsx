import { FC } from "react";

interface Props {
  alert: Function;
}
const Inventory: FC<Props> = () => {
  return (
    <main className="section-container">
      <section className="header">
        <h1>Inventory</h1>
      </section>
    </main>
  );
};

export default Inventory;
