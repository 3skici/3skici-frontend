import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

// Thunks (asynchronous actions) using `fetch`
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue, getState }) => {
    try {
         // Get token from the auth slice in the Redux store
      const token = getState().auth.token; // Assuming token is stored in state.auth.token
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token in the header
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      return data.favorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Server error');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }
      const data = await response.json();
      return data.favorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Server error');
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }
      const data = await response.json();
      return data.favorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Server error');
    }
  }
);

// Slice definition
const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending, fulfilled, and rejected states for each action
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
