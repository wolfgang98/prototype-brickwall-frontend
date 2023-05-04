import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { MarkdownCellData } from "./types";
import { useDebounceEffect } from "ahooks";
import { BaseCellModalProps } from "../WallCell/WallCell";

// todo: add base cell and modal types with id & events .. use those so typings are better
type MarkdownCellModalProps = BaseCellModalProps & MarkdownCellData;

export const MarkdownCellModal: React.FC<MarkdownCellModalProps> = (props) => {
  const [value, setValue] = useState<string>(props.content);

  // todo: use context or smth else to know when the modal was closed or saved, handle the logic in here
  // issue: when the debounce effect occurs after the modal got closed from outside, recent changes might not be synced
  useDebounceEffect(
    () => {
      props.onChange({
        content: value,
      });
    },
    [value],
    { wait: 500 }
  );

  return <MDEditor value={value} onChange={(value) => setValue(value || "")} />;
};
