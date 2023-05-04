import Typography from "antd/es/typography/Typography";
import { PobCellData } from "../../cells/PobCell";

type PobTreeProps = PobCellData["decodedBuild"];

export const PobTree: React.FC<PobTreeProps> = ({ build, items, tree }) => {
  return (
    <>
      {build && (
        <Typography>
          Level: {build.level}
          <br></br>
          Class: {build.className}
          <br></br>
          Ascendency: {build.ascendClassName}
        </Typography>
      )}
      {items && <Typography>Items: {items.items.length}</Typography>}
      {tree && <Typography>Tree Version: {tree.spec.treeVersion}</Typography>}
    </>
  );
};
