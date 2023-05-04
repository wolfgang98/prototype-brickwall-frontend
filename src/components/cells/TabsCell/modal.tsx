import React from "react";
import { TabsCellData } from "./types";
import { BaseCellModalProps } from "../WallCell/WallCell";

// todo: add base cell and modal types with id & events .. use those so typings are better
type TabsCellModalProps = BaseCellModalProps & TabsCellData;

export const TabsCellModal: React.FC<TabsCellModalProps> = (props) => {
  return <></>;
};
