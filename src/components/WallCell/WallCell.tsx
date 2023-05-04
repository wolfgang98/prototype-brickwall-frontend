import React, { useMemo } from "react";
import { Button, Card } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Cell, showModal, takeCellOwnership } from "@project/state/realtime";
import { useAppDispatch } from "@project/state";
import { colors } from "@project/util/colors";
import { useToken } from "@project/theme";
import {
  MarkdownCell,
  MarkdownCellModal,
} from "@project/components/cells/MarkdownCell";
import { TabsCell, TabsCellModal } from "@project/components/cells/TabsCell";
import { EventCell } from "@project/components/cells/EventCell";
import { PobCell, PobCellModal } from "@project/components/cells/PobCell";
import { EmptyCell } from "@project/components/cells/EmptyCell";

export interface BaseCellModalProps {
  id: string;
  onChange: (data: any) => void;
}

// figure out how to solve this to get better type safety
interface SelectCellReturn {
  View: React.FC<{ id: string } & any>;
  Modal?: React.FC<BaseCellModalProps>;
}

export function SelectCell(type: Cell["data"]["type"]): SelectCellReturn {
  switch (type) {
    case "Markdown":
      return {
        View: MarkdownCell,
        Modal: MarkdownCellModal as any,
      };
    case "Tabs":
      return {
        View: TabsCell,
        Modal: TabsCellModal as any,
      };
    case "Events":
      return {
        View: EventCell,
      };
    case "Pob":
      return {
        View: PobCell,
        Modal: PobCellModal as any,
      };
    default:
      return {
        View: EmptyCell,
      };
  }
}

const WallCell = React.forwardRef<HTMLDivElement, { id: string; cell: Cell }>(
  ({ id, cell }, ref) => {
    const dispatch = useAppDispatch();
    const { token } = useToken();

    const CellElement = useMemo(() => SelectCell(cell.data.type), [cell]);

    function EditCell() {
      dispatch(takeCellOwnership({ id }));
      dispatch(showModal({ id, cell }));
    }

    return (
      <Card
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderColor: colors.DelftBlue,
        }}
        bodyStyle={{
          flex: 1,
          overflow: "hidden",
        }}
        hoverable={true}
        size="small"
        bordered={cell.isStatic}
        title={
          cell.isStatic ? `User: ${cell.owner}` : `Cell: ${cell.data.type}`
        }
        actions={[
          <Button type="link" block onClick={EditCell} disabled={cell.isStatic}>
            <EditOutlined
              key="edit"
              style={{ fontSize: "1rem", color: "inherit" }}
            />
          </Button>,
          <Button type="link" block onClick={EditCell} disabled={cell.isStatic}>
            <CopyOutlined key="copy" style={{ fontSize: "1rem" }} />
          </Button>,
          <Button type="link" block onClick={EditCell} disabled={cell.isStatic}>
            <DeleteOutlined key="delete" style={{ fontSize: "1rem" }} />
          </Button>,
        ]}
      >
        <CellElement.View id={id} {...cell.data} />
      </Card>
    );
  }
);

export default WallCell;
