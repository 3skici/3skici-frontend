import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/category/all`);
    const data = await response.json();
    return data; // Return data to use in extraReducers
  } catch (error) {
    throw Error("Error fetching categories: " + error.message);
  }
});
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { categories: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Set fetched categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { action, reducer } = categoriesSlice;

// Export selector to access categories state
export const selectCategories = (state) => state.categories.categories;
export const selectLoading = (state) => state.categories.loading;
export const selectError = (state) => state.categories.error;


export default reducer;