//@ts-nocheck
import { FC, useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";

import "./ScanTable.css";

interface Props {
  visible: boolean;
  onCloseDialog: Function;
  selectedRow: {};
}

const ScanTableDialog: FC<Props> = ({
  visible,
  onCloseDialog,
  selectedRow,
}) => {
  useEffect(() => {
    return () => {
      selectedRow = {};
    };
  }, [visible]);

  return (
    <Dialog visible={visible} onHide={onCloseDialog} dismissableMask={true}>
      {selectedRow.id} {selectedRow.title} {selectedRow.body}
    </Dialog>
  );
};

export default ScanTableDialog;
