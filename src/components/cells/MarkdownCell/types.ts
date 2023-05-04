import { CellDataBase } from "@project/state/realtime";

export interface MarkdownCellData extends CellDataBase {
  type: "Markdown",
  content: string;
}