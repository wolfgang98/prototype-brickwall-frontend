import { configureStore } from '@reduxjs/toolkit';
import { signalMiddleware } from 'redux-signalr';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSignalRConnection } from '@project/signalr';
import { createSignalRCallbacks } from '@project/signalr/callbacks';
import { connection } from '@project/signalr';
import { realtimeReducer } from './realtime';


export function createAppStore() {
  // const connection = createSignalRConnection();
  const callbacks = createSignalRCallbacks();

  const signal = signalMiddleware({
    callbacks,
    connection,
  });

  const store = configureStore({
    reducer: {
      realtime: realtimeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
      signal
    )
  });

  return store;
}

export const store = createAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;