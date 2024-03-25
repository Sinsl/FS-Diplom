import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth: (state, {payload}) => {
      state.token = payload
    },
  }
})

export const { changeAuth } = authSlice.actions;
export default authSlice.reducer;