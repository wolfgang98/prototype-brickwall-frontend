import { withCallbacks } from "redux-signalr";
import { PAGE_ID, SignalRDispatch } from ".";
import { RootState } from "@project/state";
import { Cell, Page, addEvent, setConnectionId, setPage } from "@project/state/realtime";

type GetState = () => RootState;
type Invoke = <T = any>(methodName: string, ...args: any[]) => Promise<T>;

export function createSignalRCallbacks() {
  const callbacks = withCallbacks<SignalRDispatch, RootState>()
    .add("Receive", (msg: string) => (dispatch, getState, invoke) => {
      const { type, ...rest } = JSON.parse(msg);

      console.log("Received", type, JSON.stringify(rest));
      dispatch(addEvent({ type }));

      switch(type) {
        case "connection.handshake":
          ConnectionHandshake(rest, dispatch, getState, invoke);
          break;
        case "page.join":
          PageJoin(rest, dispatch, getState, invoke);
          break;
        case "page.update":
          PageUpdate(rest, dispatch, getState, invoke);
          break;
        case "page.position":
          PagePosition(rest, dispatch, getState, invoke);
          break;
        case "page.layout.update":
          PageLayoutUpdate(rest, dispatch, getState, invoke);
          break;
      }
    });

  return callbacks;
}

type ConnectionHandshakePayload = { connectionId: string };
function ConnectionHandshake({ connectionId }: ConnectionHandshakePayload, dispatch: SignalRDispatch, getState: GetState, invoke: Invoke) {
  dispatch(setConnectionId(connectionId));
  // todo: add to slice
  invoke("Send", {
    action: `page/${PAGE_ID}/join`
  });
}

type PageJoinPayload = { connections: number };
function PageJoin({ connections }: PageJoinPayload, dispatch: SignalRDispatch, getState: GetState, invoke: Invoke) {
  let page = getState().realtime.page;

  dispatch(setPage({...page, connections}));
}

type PageUpdatePayload = { connections: number };
function PageUpdate({ connections }: PageUpdatePayload, dispatch: SignalRDispatch, getState: GetState, invoke: Invoke) {
  let page = getState().realtime.page;

  dispatch(setPage({...page, connections}));
}

type PagePositionPayload = { connectionId: number; x: number; y: number; };
function PagePosition({ connectionId, x, y }: PagePositionPayload, dispatch: SignalRDispatch, getState: GetState, invoke: Invoke) {
  let page = getState().realtime.page;

  dispatch(setPage({...page, positions: { ...page.positions, [connectionId]: { x, y } }}));
}

type PageLayoutUpdatePayload = {
  cells: Cell[];
};
// todo: 

function PageLayoutUpdate({ cells }: PageLayoutUpdatePayload, dispatch: SignalRDispatch, getState: GetState, invoke: Invoke) {
  let page = getState().realtime.page;

  let tempCells: Page['cells'] = {};
  cells.forEach((cell) => {
    tempCells = {
      ...tempCells,
      [cell.id]: {
        id: cell.id,
        x: cell.x,
        y: cell.y,
        w: cell.w,
        h: cell.h,
        isStatic: cell.isStatic,
        owner: cell.owner,
        data: cell.data,
      },
    };
  });
  dispatch(setPage({...page, cells: {...page.cells, ...tempCells}}));
}