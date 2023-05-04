import { useAppSelector } from "@project/state";
import { Skeleton } from "antd";

export type EventCellProps = { id: string };

export const EventCell: React.FC<EventCellProps> = (props) => {
  const events = useAppSelector((state) => state.realtime.events);

  return (
    <Skeleton loading={false} active>
      {events
        .slice(events.length - 5, events.length - 1)
        .map((event, index) => (
          <div key={index}>{event.type}</div>
        ))}
    </Skeleton>
  );
};
