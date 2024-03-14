import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectHall: 0
}

export const selectedHallSlice = createSlice({
  name: 'selectHall',
  initialState,
  reducers: {
    changeSelect: (state, {payload}) => {
      state.selectHall = payload
    },
  }
})

export const { changeSelect } = selectedHallSlice.actions;
export default selectedHallSlice.reducer;