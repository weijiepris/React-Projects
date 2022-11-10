import { FC, useEffect, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

interface Props {
  alert: Function;
}
const Scan: FC<Props> = () => {
  const [customers, setCustomers] = useState(null);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [filters3, setFilters3] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [selectedCustomer2, setSelectedCustomer2] = useState(null);

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  const filtersMap: any = {
    filters1: { value: filters1, callback: setFilters1 },
    filters2: { value: filters2, callback: setFilters2 },
    filters3: { value: filters3, callback: setFilters3 },
  };

  useEffect(() => {}, []);

  const statusFilterTemplate = (options: any) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: any) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const onGlobalFilterChange = (event: any, filtersKey: any) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters["global"].value = value;

    filtersMap[filtersKey].callback(filters);
  };

  const renderHeader = (filtersKey: any) => {
    const filters = filtersMap[`${filtersKey}`].value;
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder="Global Search"
        />
      </span>
    );
  };

  const header2 = renderHeader("filters2");

  return (
    <main className="section-container">
      <section className="header">
        <h1>Scan</h1>
      </section>
      <section className="section">
        <DataTable
          value={customers}
          paginator
          rows={10}
          header={header2}
          filters={filters2}
          onFilter={(e: any) => setFilters2(e.filters)}
          selection={selectedCustomer2}
          onSelectionChange={(e) => setSelectedCustomer2(e.value)}
          selectionMode="single"
          dataKey="id"
          responsiveLayout="scroll"
          stateStorage="local"
          stateKey="dt-state-demo-local"
          emptyMessage="No customers found."
        >
          <Column
            field="name"
            header="Product Name"
            sortable
            filter
            filterPlaceholder="Search by name"
          ></Column>
          <Column
            header="Country"
            sortable
            sortField="country.name"
            filter
            filterField="country.name"
            filterPlaceholder="Search by country"
          ></Column>
          <Column
            header="Date"
            sortable
            sortField="country.name"
            filter
            filterField="country.name"
            filterPlaceholder="Search by country"
          ></Column>
          <Column
            header="Remarks"
            sortable
            sortField="representative.name"
            filter
            filterField="representative"
            filterMenuStyle={{ width: "14rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            sortable
            filter
            filterElement={statusFilterTemplate}
            filterMenuStyle={{ width: "14rem" }}
          ></Column>
        </DataTable>
      </section>
      <section className="section"></section>
    </main>
  );
};

export default Scan;
