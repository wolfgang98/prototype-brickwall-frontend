import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cell, CellData, Page } from "./types";
import { PAGE_ID, connection } from "@project/signalr";

interface Event {
  type: string;
}

export enum ModalActionTypes {
  ShowModal,
  CloseModal
}

export interface CellModal {
  type: ModalActionTypes;
  id?: string;
  cell?: Cell;
}

interface RealtimeState {
  connectionId?: string;
  mousePosition?: { x: number; y: number; };
  page: Page;
  events: Event[];
  cellModal: CellModal;
}

const initialState: RealtimeState = {
  connectionId: undefined,
  mousePosition: undefined,
  page: {
    id: '',
    connections: 0,
    cells: {},
    positions: {}
  },
  events: [],
  cellModal: {
    type: ModalActionTypes.CloseModal,
    id: undefined,
    cell: undefined,
  }
}

export const realtimeSlice = createSlice({
  name: "realtime",
  initialState,
  reducers: {
    setConnectionId: (state, action) => {
      state.connectionId = action.payload;
    },
    setMousePosition: (state, action) => {
      state.mousePosition = action.payload;
      // figure out how to acces invoke by using the signalR middleware
      if (state.page.connections > 1) {
        connection.invoke('Send', { action: `page/${PAGE_ID}/position`, payload: JSON.stringify({ x: action.payload.x, y: action.payload.y })});
      }
    },
    setPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    showModal: (state, action: PayloadAction<Required<Omit<CellModal, 'type'>>>) => {
      state.cellModal.type = ModalActionTypes.ShowModal;
      state.cellModal.id = action.payload.id;
      state.cellModal.cell = action.payload.cell;
    },
    hideModel: (state) => {
      state.cellModal.type = ModalActionTypes.CloseModal;
      state.cellModal.id = undefined;
      state.cellModal.cell = undefined;
    },
    saveCell: (state, action: PayloadAction<{ id: string, cell: Partial<Cell> }>) => {
      state.page.cells[action.payload.id].data = { ...state.page.cells[action.payload.id].data, ...action.payload.cell.data };
      connection.invoke('Send', { action: `page/${PAGE_ID}/cell/${action.payload.id}/update`, payload: JSON.stringify({ ...action.payload.cell })});
    },
    takeCellOwnership: (state, action: PayloadAction<{ id: string }>) => {
      connection.invoke('Send', { action: `page/${PAGE_ID}/cell/${action.payload.id}/ownership/take` });
    },
    returnCellOwnership: (state, action: PayloadAction<{ id: string }>) => {
      connection.invoke('Send', { action: `page/${PAGE_ID}/cell/${action.payload.id}/ownership/return` });
    },
  }
});

export const {setConnectionId, setMousePosition, setPage, addEvent, showModal, hideModel, saveCell, takeCellOwnership, returnCellOwnership} = realtimeSlice.actions;

export const realtimeReducer = realtimeSlice.reducer;