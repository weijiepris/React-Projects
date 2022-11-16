import { FC, useState, useMemo, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../ScanTable.css";
import { mapSummariseObject } from "./actions";
import ScanTableMobileSummarisedDialog from "./ScanTableMobileSummarisedDialog";
import { SummarisedModel } from "../model/ScanModel";
import { InputText } from "primereact/inputtext";

interface Props {
  data: SummarisedModel[];
}

const ScanTableMobileSummarised: FC<Props> = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SummarisedModel>();
  const [globalFilter, setGlobalFilter] = useState(null);

  const cols = [
    { field: "userId", header: "Product Name" },
    { field: "count", header: "Count" },
  ];

  useEffect(() => {}, [data]);

  const onSelectRow = (e: any): void => {
    setSelectedRow(e.data);
    setVisible(true);
  };

  const onCloseDialog = (): void => {
    setSelectedRow({ body: [], count: 0, userId: 0 });
    setVisible(false);
  };

  return (
    <>
      <div style={{ marginBottom: "25px" }}>
        <InputText
          type="search"
          onInput={(e: any) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <DataTable
        value={data}
        dataKey="id"
        globalFilter={globalFilter}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[3, 5, 10, 25, 50]}
        paginator
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        rows={5}
        className="datatable-mobile-view"
        selectionMode="multiple"
        emptyMessage="No data found."
        onRowClick={(row) => onSelectRow(row)}
      >
        {cols.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} sortable />
        ))}
      </DataTable>
      <ScanTableMobileSummarisedDialog
        visible={visible}
        onCloseDialog={onCloseDialog}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ScanTableMobileSummarised;
