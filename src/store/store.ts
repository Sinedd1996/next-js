import { configureStore } from "@reduxjs/toolkit";
import errorMessageReducer from "./slices/errorMessageSlice";

export const store = configureStore({
  reducer: {
    counter: errorMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
