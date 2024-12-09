// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message || "Failed to login");
      }

      const data = await response.json();
      const { token, user } = data;

       // Save token to localStorage
       localStorage.setItem("token", token);

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to login");
    }
  }
);

// Async thunk for loading user on app startup
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      // If no token, just return null or a special value instead of rejecting.
      // This way, we avoid treating it as an error.
      return { token: null, user: null };
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/user`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Token might be invalid or expired
        localStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Failed to authenticate");
      }

      const user = await response.json();
      return { token, user };
    } catch (error) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue("Failed to authenticate");
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // If your backend requires an API call to logout, you can make it here
  return;
});

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle loadUser
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = "failed";
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
