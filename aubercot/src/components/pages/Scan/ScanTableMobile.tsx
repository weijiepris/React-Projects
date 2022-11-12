//@ts-nocheck
import { FC, useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";

import "./ScanTable.css";

interface Props {
  posts: any[];
}

const ScanTableMobile: FC<Props> = ({ posts }) => {
  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {}, [posts]);

  const cols = [
    { field: "userId", header: "Product Name" },
    { field: "title", header: "Date" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly: any) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF: any) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, posts);
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(posts);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "posts");
    });
  };

  const saveAsExcelFile = (buffer: any, fileName: any) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const onSelectionChange = (e: any) => {
    setSelectedProducts(e.value);
  };

  return (
    <>
      <DataTable
        ref={dt}
        globalFilter={globalFilter}
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
        selection={selectedProducts}
        onSelectionChange={onSelectionChange}
      >
        {cols.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} sortable />
        ))}
      </DataTable>
    </>
  );
};

export default ScanTableMobile;
