import { useEffect, useRef, useState } from "react";
import Wall from "../Wall/Wall";
import { useAppDispatch, useAppSelector } from "@project/state";
import { setMousePosition } from "@project/state/realtime";
import { useMouse, useThrottleEffect } from "ahooks";
import { Typography } from "antd";
import { CursorIcon } from "@project/icons/cursor";

export default function WallContainer() {
  const appRef = useRef<HTMLDivElement>(null);

  const connectionId = useAppSelector((state) => state.realtime.connectionId);
  const page = useAppSelector((state) => state.realtime.page);
  const dispatch = useAppDispatch();

  const state = useMouse(appRef);

  useThrottleEffect(
    () => {
      const x = state.clientX;
      const y = state.clientY;
      if (isNaN(x) || isNaN(y)) return;

      console.log("Throttled Mouse Position", x, y);
      if (page.connections > 1) {
        dispatch(setMousePosition({ x, y }));
      }
    },
    [state],
    { wait: 500 }
  );

  return (
    <div
      ref={appRef}
      className="App"
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <div style={{ position: "absolute" }}>
        <Typography>
          Connections: {page.connections} - {connectionId}
        </Typography>
      </div>
      <Wall />
      {page.positions &&
        Object.keys(page.positions).map((key) => (
          <div
            key={key}
            style={{
              position: "absolute",
              transition: "all 500ms ease-out",
              top: page.positions[key].y - 4,
              left: page.positions[key].x - 4,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <CursorIcon style={{ fontSize: "2rem", color: "hotpink" }} />
            <Typography>{key}</Typography>
          </div>
        ))}
    </div>
  );
}
