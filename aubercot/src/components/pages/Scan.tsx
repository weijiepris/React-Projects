//@ts-nocheck
import { FC, useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import axios from "axios";

interface Props {
  alert: Function;
}
const Scan: FC<Props> = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [importedData, setImportedData] = useState([]);
  const [selectedImportedData, setSelectedImportedData] = useState([]);
  const [importedCols, setImportedCols] = useState([
    { field: "", header: "Header" },
  ]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const toast = useRef(null);

  const cols = [
    { field: "id", header: "id" },
    { field: "userId", header: "User ID" },
    { field: "title", header: "Title" },
    { field: "body", header: "Description" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data));
  }, []);

  const importCSV = (e: any) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, "").split(",");
      data.shift();

      let _importedCols = cols.map((col: any) => ({
        field: col,
        header: toCapitalize(col.replace(/['"]+/g, "")),
      }));
      let _importedData = data.map((d: any) => {
        d = d.split(",");
        return cols.reduce((obj: any, c: any, i: any) => {
          obj[c] = d[i].replace(/['"]+/g, "");
          return obj;
        }, {});
      });

      setImportedCols(_importedCols);
      setImportedData(_importedData);
    };

    reader.readAsText(file, "UTF-8");
  };

  const importExcel = (e: any) => {
    const file = e.files[0];

    import("xlsx").then((xlsx: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const wb = xlsx.read(e.target.result, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

        // Prepare DataTable
        const cols = data[0];
        data.shift();

        let _importedCols = cols.map((col: any) => ({
          field: col,
          header: toCapitalize(col),
        }));
        let _importedData = data.map((d: any) => {
          return cols.reduce((obj: any, c: any, i: any) => {
            obj[c] = d[i];
            return obj;
          }, {});
        });

        setImportedCols(_importedCols);
        setImportedData(_importedData);
      };

      reader.readAsArrayBuffer(file);
    });
  };

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

  const toCapitalize = (s: any) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const clear = () => {
    setImportedData([]);
    setSelectedImportedData([]);
    setImportedCols([{ field: "", header: "Header" }]);
  };

  const onImportSelectionChange = (e: any) => {
    setSelectedImportedData(e.value);
    const detail = e.value.map((d: any) => Object.values(d)[0]).join(", ");
    toast.current.show({
      severity: "info",
      summary: "Data Selected",
      detail,
      life: 3000,
    });
  };

  const onSelectionChange = (e: any) => {
    setSelectedProducts(e.value);
  };

  const header = (
    <div className="flex align-items-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file"
        onClick={() => exportCSV(false)}
        className="mr-2"
        data-pr-tooltip="Export all to CSV"
      />
      <Button
        type="button"
        icon="pi pi-file-excel"
        onClick={exportExcel}
        className="p-button-success mr-2"
        data-pr-tooltip="Export all to Excel"
      />
      <Button
        type="button"
        icon="pi pi-file-pdf"
        onClick={exportPdf}
        className="p-button-warning mr-2"
        data-pr-tooltip="Export all to PDF"
      />
      <Button
        type="button"
        icon="pi pi-filter"
        onClick={() => exportCSV(true)}
        className="p-button-info ml-auto"
        data-pr-tooltip="Export Selections Only"
      />
      <div className="table-header">
        <h5 className="mx-0 my-1">Manage Products</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
    </div>
  );

  return (
    <div className="section-container">
      <section className="header">
        <h1>Scan</h1>
      </section>
      <div className="card">
        <h5>Export</h5>

        <Tooltip target=".export-buttons>button" position="bottom" />

        <DataTable
          ref={dt}
          globalFilter={globalFilter}
          value={posts}
          header={header}
          dataKey="id"
          responsiveLayout="scroll"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          paginator
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
          rows={10}
          className="datatable-responsive"
          responsiveLayout="scroll"
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
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Scan;
