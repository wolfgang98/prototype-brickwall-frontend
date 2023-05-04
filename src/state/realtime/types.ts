import { MarkdownCellData } from "@project/components/cells/MarkdownCell/types";
import { PobCellData } from "@project/components/cells/PobCell";

export interface CellDataBase {
  type: string;
}


export interface TabsCellData extends CellDataBase {
  type: "Tabs",
  cells: Cell[],
}

export interface EventsCellData extends CellDataBase {
  type: "Events",
  cells: Cell[],
}

export type CellData = MarkdownCellData | TabsCellData | EventsCellData | PobCellData;

export interface Cell {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isStatic: boolean;
  owner: string;
  data: CellData;
}

type Cells = { [id: string]: Cell };
type Positions = { [id: string]: { x: number; y: number; }; };

export interface Page {
  id: string;
  // todo: change to list of connectionIds/usernames and mousepositions
  connections: number;
  cells: Cells;
  // todo: merge with connections
  positions: Positions;
}