// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login/users`,
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
            "Content-Type": "application/json",
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

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (formData, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    const userId = getState().auth.user?._id;

    if (!token || !userId) {
      return rejectWithValue("User not authenticated");
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      return updatedUser; // Return the updated user object
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);

// Async thunk for requesting password reset email
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/forgetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(
          error.message || "Failed to send reset email"
        );
      }

      return { message: "Reset email sent successfully" };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to send reset email"
      );
    }
  }
);

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(
          error.message || "Failed to reset password"
        );
      }

      return { message: "Password reset successful" };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to reset password"
      );
    }
  }
);

// Add a helper function to normalize the user object
const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    _id: user._id || user.id, // Normalize to always use _id
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
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
        if (action.payload.user) {
          state.user = normalizeUser(action.payload.user);
        } else {
          state.user = null;
        }
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
        if (action.payload.user) {
          state.user = normalizeUser(action.payload.user);
        } else {
          state.user = null;
        }
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
      })
      // Handle profile update actions
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Update the user data
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
