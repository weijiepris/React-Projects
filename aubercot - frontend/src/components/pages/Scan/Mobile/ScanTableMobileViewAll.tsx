import { FC, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../ScanTable.css";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import ScanTableMobileDialog from "./ScanTableMobileViewAllDialog";

interface Props {
  posts: any[];
}

const ScanTableMobileViewAll: FC<Props> = ({ posts }) => {
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {}, [posts]);

  const cols = [
    { field: "id", header: "Product ID" },
    { field: "userId", header: "id" },
  ];

  const onSelectRow = (e: any): void => {
    setSelectedRow(e.data);
    setVisible(true);
  };

  const onCloseDialog = (): void => {
    setSelectedRow({});
    setVisible(false);
  };

  return (
    <>
      <div style={{ marginBottom: "25px" }}>
        <InputText
          type="search"
          onInput={(e: any) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search..."
        />
      </div>
      <DataTable
        value={posts}
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
          <Column
            key={index}
            field={col.field}
            header={col.header}
            sortable
            filter
            filterField={col.field}
          />
        ))}
      </DataTable>
      <ScanTableMobileDialog
        visible={visible}
        onCloseDialog={onCloseDialog}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ScanTableMobileViewAll;
