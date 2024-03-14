import { configureStore } from "@reduxjs/toolkit";
import selectedDayReducer from "../slices/selectedDaySlice";

export const store = configureStore({
  reducer: {
    selectedDay: selectedDayReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
