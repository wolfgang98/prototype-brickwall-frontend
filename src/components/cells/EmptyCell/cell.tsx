import { Empty } from "antd";

export const EmptyCell: React.FC = () => {
  return (
    <Empty
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        margin: 0,
      }}
      imageStyle={{
        width: "50%",
        maxWidth: "100px",
      }}
    />
  );
};
