import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Halls } from '../../../../types/types';
import { requests } from '../../requests';

interface getHallsState {
    halls: Halls[],
    loading: boolean,
    error: string | null
}

const initialState: getHallsState = {
  halls: [],
  loading: false,
  error: null
}

export const fetchHalls = createAsyncThunk(
  'halls/fetchHalls',
  async () => {
    const resp = await requests('get', '/admin/halls', null);
    const data = await resp?.data;
    return data;
  }
)

export const getHallsSlice = createSlice({
  name: 'fetchHalls',
  initialState,
  reducers: {
    clearHalls: (state => {
      state.halls = []
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHalls.pending, (state) => {
        state.loading = true,
        state.error = null
      })
      .addCase(fetchHalls.fulfilled, (state, { payload }) => {
        state.halls = payload,
        state.loading = false,
        state.error = null
      })
      .addCase(fetchHalls.rejected, (state, {error}) => {
        state.loading = false,
        state.error = error.message as string
      })
  }
})

export const { clearHalls } = getHallsSlice.actions;
export default getHallsSlice.reducer;