import { FC, useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";

import "../ScanTable.css";
import { Button } from "primereact/button";
import { SummarisedModel } from "../model/ScanModel";

interface Props {
  visible: boolean;
  onCloseDialog: () => void;
  selectedRow: SummarisedModel;
}

const ScanTableMobileSummarisedDialog: FC<Props> = ({
  visible,
  onCloseDialog,
  selectedRow,
}) => {
  useEffect(() => {
    return () => {
      selectedRow = { body: [], count: 0, userId: 0 };
    };
  }, [visible]);

  return (
    <Dialog
      visible={visible}
      onHide={onCloseDialog}
      dismissableMask={true}
      closable={false}
      className="scan-dialog"
    >
      <div className="scan-dialog-div">Product Name: </div>
      <div className="scan-dialog-div">Status: </div>
      <div className="scan-dialog-div">Date: </div>
      <div className="scan-dialog-div">Modified by: </div>
      <div className="scan-dialog-div">Modified date: </div>
      <div className="scan-dialog-div">Count: {selectedRow?.count}</div>
      <div className="scan-dialog-div">
        {selectedRow?.body.map((data) => (
          <div className="scan-dialog-summarised-content" key={data.id}>
            {data.id}
          </div>
        ))}
      </div>
      <div className="scan-dialog-div">
        <div>
          <Button
            label="Reset"
            className="p-button-outlined p-button-secondary"
          />
        </div>
        <div>
          <Button
            icon="pi pi-share-alt"
            className="p-button-rounded p-button-text p-button-plain"
            aria-label="Filter"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ScanTableMobileSummarisedDialog;
