import { useEffect, useMemo, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { useSize, useWhyDidYouUpdate } from "ahooks";
import { useAppDispatch, useAppSelector } from "@project/state";
import WallCell from "@project/components/cells/WallCell/WallCell";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { colors } from "@project/util/colors";
import { saveCell } from "@project/state/realtime";

export default function Wall() {
  const cells = useAppSelector((state) => state.realtime.page.cells);
  const dispatch = useAppDispatch();

  const container = useRef<HTMLDivElement>(null);
  const size = useSize(container);

  const layout = useMemo<Layout[]>(() => {
    if (!cells) return [];

    return Object.keys(cells).map((key) => {
      const value = cells[key];
      return {
        i: key,
        x: value.x,
        y: value.y,
        w: value.w,
        h: value.h,
        static: value.isStatic,
      };
    });
  }, [cells]);

  const handleItemChange: GridLayout.ItemCallback = (
    newLayout,
    oldItem,
    newItem
  ) => {
    let changed: GridLayout.Layout[] = [newItem];

    layout.forEach((oldLayoutItem) => {
      if (oldItem.i === oldLayoutItem.i) return;

      const item = newLayout.find((item) => item.i == oldLayoutItem.i);
      if (!item) return;

      if (
        oldLayoutItem.x !== item.x ||
        oldLayoutItem.y !== item.y ||
        oldLayoutItem.w !== item.w ||
        oldLayoutItem.h !== item.h
      ) {
        changed.push(item);
      }
    });

    changed.forEach((item) => {
      // todo: add security check, if owner is the current user
      dispatch(
        saveCell({
          id: item.i,
          cell: {
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          },
        })
      );
    });
  };

  return (
    <div
      ref={container}
      style={{ width: "100%", height: "100%", background: colors.RaisinBlack }}
    >
      {layout && size && (
        <GridLayout
          layout={layout}
          cols={8}
          width={size.width}
          rowHeight={size.height / 8}
          autoSize={false}
          compactType={null}
          margin={[4, 4]}
          containerPadding={[0, 0]}
          onDragStop={handleItemChange}
          onResizeStop={handleItemChange}
        >
          {cells &&
            Object.keys(cells).map((key) => (
              <div key={key}>
                <WallCell key={key} id={key} cell={cells[key]} />
              </div>
            ))}
        </GridLayout>
      )}
    </div>
  );
}
