import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedDay: Date.now() + (2 * 24 * 60 * 60 * 1000),
}

export const selectedDaySlice = createSlice({
  name: 'selectedDay',
  initialState,
  reducers: {
    setActivDay: (state, action) => {
      state.selectedDay = action.payload
    },
  }
})

export const { setActivDay } = selectedDaySlice.actions;
export default selectedDaySlice.reducer;