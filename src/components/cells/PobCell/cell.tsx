import { Skeleton } from "antd";
import { PobCellData } from "./types";
import Typography from "antd/es/typography/Typography";
import { PobTree } from "../../PathOfBuilding/PobTree/PobTree";

type PobCellProps = { id: string } & PobCellData;

export const PobCell: React.FC<PobCellProps> = ({ decodedBuild }) => {
  return (
    <Skeleton loading={!decodedBuild} active>
      {decodedBuild && <PobTree {...decodedBuild} />}
    </Skeleton>
  );
};
