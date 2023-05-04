import { Modal } from "antd";
import WallContainer from "./WallContainer/WallContainer";
import { useAppDispatch, useAppSelector } from "../state";
import {
  ModalActionTypes,
  hideModel,
  returnCellOwnership,
  saveCell,
} from "../state/realtime";
import React, { useMemo, useState } from "react";
import { SelectCell } from "./cells/WallCell/WallCell";

export default function App() {
  const cellModal = useAppSelector((state) => state.realtime.cellModal);
  const dispatch = useAppDispatch();

  const CellElement = useMemo(() => {
    if (!cellModal.cell?.data.type) return undefined;
    return SelectCell(cellModal.cell.data.type);
  }, [cellModal]);

  // todo: improve typings
  const [cellData, setCellData] = useState<any>({});
  function handleChange(data: any) {
    setCellData(data);
  }

  function handleSubmit() {
    if (!cellModal.id || !cellModal.cell || !cellData) return;
    dispatch(hideModel());
    dispatch(
      saveCell({
        id: cellModal.id,
        cell: {
          data: cellData,
        },
      })
    );
  }

  function handleCancel() {
    dispatch(hideModel());
    if (cellModal.id) dispatch(returnCellOwnership({ id: cellModal.id }));
  }

  return (
    <div
      className="App"
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <Modal
        open={cellModal.type === ModalActionTypes.ShowModal}
        title={cellModal.cell?.data.type}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        {CellElement && CellElement.Modal && cellModal.id && cellModal.cell && (
          <CellElement.Modal
            id={cellModal.id}
            {...cellModal.cell.data}
            onChange={handleChange}
          />
        )}
        {/* {CellElement?.Modal} */}
      </Modal>
      <WallContainer />
    </div>
  );
}
