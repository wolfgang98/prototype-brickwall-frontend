import { AnyAction, HttpTransportType, HubConnectionBuilder, LogLevel } from "redux-signalr";
import { SignalAction, SignalDispatch } from 'redux-signalr';

import { RootState } from "@project/state";

export type SignalRAction<ReturnValue = void> = SignalAction<
  ReturnValue,
  RootState,
  AnyAction
>;

export type SignalRDispatch<Action extends AnyAction = AnyAction> = SignalDispatch<
  RootState,
  Action
>;

// todo: get from router and invoke connection to specific page
export const PAGE_ID = "123456789";

export function createSignalRConnection() {
  const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug)
    .withUrl('http://localhost:5000/echo', {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  return connection;
}

export const connection = createSignalRConnection();

