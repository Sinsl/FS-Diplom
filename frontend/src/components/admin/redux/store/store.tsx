import { configureStore } from "@reduxjs/toolkit";
import getHallsReduser from "../slices/getHallsSlice";
import selectedHallReduser from "../slices/selectedHallSlice"

export const store = configureStore({
  reducer: {
    halls: getHallsReduser,
    selectHall: selectedHallReduser
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
        ignoredActionPaths: ['meta.arg', 'payload.headers'],
    },
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
