import { FC, useState, useMemo, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../ScanTable.css";
import { SummarisedModel } from "../model/ScanModel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

interface Props {
  data: SummarisedModel[];
}

const ScanTableBrowserSummarised: FC<Props> = ({ data }) => {
  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const cols = [
    { field: "userId", header: "Product Name" },
    { field: "count", header: "Count" },
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
        doc.autoTable(exportColumns, data);
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "data");
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

  const header = (
    <div className="export-container">
      <div className="export-buttons">
        <Button
          type="button"
          icon="pi pi-file"
          onClick={() => exportCSV(false)}
          className="mr-2 button-margin"
          data-pr-tooltip="Export all to CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success mr-2 button-margin"
          data-pr-tooltip="Export all to Excel"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning mr-2 button-margin"
          data-pr-tooltip="Export all to PDF"
        />
        <Button
          type="button"
          icon="pi pi-filter"
          onClick={() => exportCSV(true)}
          className="p-button-info ml-auto button-margin"
          data-pr-tooltip="Export Selections Only as CSV"
        />
      </div>
      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e: any) => setGlobalFilter(e.target.value)}
            placeholder="Keyword Search..."
          />
        </span>
        <Tooltip target=".export-buttons>button" position="bottom" />
      </div>
    </div>
  );

  return (
    <>
      <DataTable
        ref={dt}
        globalFilter={globalFilter}
        value={data}
        header={header}
        dataKey="userId"
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        paginator
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        rows={5}
        className="datatable-normal-view"
        selectionMode="multiple"
        emptyMessage="No data found."
        selection={selectedProducts}
        onSelectionChange={onSelectionChange}
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
    </>
  );
};

export default ScanTableBrowserSummarised;
