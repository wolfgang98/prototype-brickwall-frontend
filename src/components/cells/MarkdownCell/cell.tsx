import { Skeleton } from "antd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MarkdownCellData } from "./types";

type MarkdownCellProps = { id: string } & MarkdownCellData;

export const MarkdownCell: React.FC<MarkdownCellProps> = (props) => {
  return (
    <Skeleton loading={false} active>
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </Skeleton>
  );
};
