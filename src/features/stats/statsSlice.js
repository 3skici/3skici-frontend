// src/slices/statsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an initial state for the statistics
const initialState = {
  users: 0,
  products: 0,
  reports: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch statistics
export const fetchStatistics = createAsyncThunk(
  "stats/fetchStatistics",
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/statistics`);

    const data = await response.json();

    return data; // This will be the payload of the fulfilled action
  }
);

// Create a slice (actions and reducers together)
const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    //  regular reducers here (not async ones)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.products = action.payload.products;
        state.reports = action.payload.reports;
        state.categories = action.payload.categories;
        state.loading = false;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statsSlice.reducer;
