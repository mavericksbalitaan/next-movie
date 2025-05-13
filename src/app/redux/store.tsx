import { configureStore } from "@reduxjs/toolkit";
import faveReducer from "./faveSlice";

const store = configureStore({
  reducer: faveReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
