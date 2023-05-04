import { Skeleton, Tabs, Typography } from "antd";
import { TabsCellData } from "./types";
import { SelectCell } from "../WallCell/WallCell";
import { useMemo } from "react";

import * as Icons from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";

function SelectIcon(name: string) {
  const iconEntries = Object.entries(Icons);
  const index = iconEntries.findIndex(([key]) => key == name);
  const item = iconEntries.at(index);
  console.log(item);
  if (item) return item[1] as typeof Icon;
}

type TabsCellProps = { id: string } & TabsCellData;

export const TabsCell: React.FC<TabsCellProps> = ({ id, tabs, type }) => {
  const items = useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      Icon: SelectIcon(tab.icon),
      View: SelectCell(tab.cell.data.type).View,
    }));
  }, [tabs]);

  return (
    <Skeleton loading={false} active>
      <Tabs
        defaultActiveKey="0"
        items={items.map((Tab, index) => ({
          key: index.toString(),
          label: (
            <div style={{ display: "flex" }}>
              {Tab.Icon && <Tab.Icon style={{ color: Tab.color }} />}{" "}
              <Typography style={{ color: Tab.color }}>{Tab.title}</Typography>
            </div>
          ),
          children: <Tab.View key={Tab.cell.id} {...Tab.cell.data} />,
        }))}
      />
    </Skeleton>
  );
};
