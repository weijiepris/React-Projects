import { BreadCrumb } from "primereact/breadcrumb";
import { FC } from "react";

interface Props {
  alert: Function;
}
const Products: FC<Props> = () => {
  return (
    <main className="section-container">
      <section className="header">
        <h1>Products</h1>
      </section>
      <section className="section"></section>
      <section className="section"></section>
    </main>
  );
};

export default Products;
