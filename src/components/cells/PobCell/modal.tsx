import React, { useState } from "react";
import { PobCellData } from "./types";
import { BaseCellModalProps } from "../WallCell/WallCell";
import { useDebounceEffect } from "ahooks";
import { Input } from "antd";

// todo: add base cell and modal types with id & events .. use those so typings are better
type PobCellModalProps = BaseCellModalProps & PobCellData;

export const PobCellModal: React.FC<PobCellModalProps> = ({
  build,
  onChange,
}) => {
  const [value, setValue] = useState<string>(build);

  // todo: use context or smth else to know when the modal was closed or saved, handle the logic in here
  // issue: when the debounce effect occurs after the modal got closed from outside, recent changes might not be synced
  useDebounceEffect(
    () => {
      onChange({
        build: value,
      });
    },
    [value],
    { wait: 100 }
  );

  return (
    <Input
      addonBefore="PATH OF BUILDING CODE"
      defaultValue={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
