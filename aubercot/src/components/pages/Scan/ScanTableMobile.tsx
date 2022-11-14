//@ts-nocheck
import { FC, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";

import "./ScanTable.css";
import ScanTableDialog from "./ScanTableDialog";

interface Props {
  posts: any[];
}

const ScanTableMobile: FC<Props> = ({ posts }) => {
  const dt = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {}, [posts]);

  const cols = [
    { field: "userId", header: "Product Name" },
    { field: "title", header: "Date" },
  ];

  const onSelectRow = (e: any) => {
    setSelectedRow(e.data);
    setVisible(true);
  };

  const onCloseDialog = () => {
    setSelectedRow({});
    setVisible(false);
  };

  return (
    <>
      <DataTable
        value={posts}
        dataKey="id"
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        paginator
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        rows={5}
        className="datatable-mobile-view"
        responsiveLayout="scroll"
        selectionMode="multiple"
        emptyMessage="No data found."
        onRowClick={(row) => onSelectRow(row)}
      >
        {cols.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} sortable />
        ))}
      </DataTable>
      <ScanTableDialog
        visible={visible}
        onCloseDialog={onCloseDialog}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ScanTableMobile;
