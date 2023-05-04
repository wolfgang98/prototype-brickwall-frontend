import { Cell, CellDataBase } from "@project/state/realtime";

export interface TabsCellData extends CellDataBase {
  type: "Tabs",
  tabs: {
    title: string;
    icon: string,
    color: string;
    cell: Cell;
  }[];
}