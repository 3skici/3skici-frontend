import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserReport = createAsyncThunk(
  "reports/fetchUserReport",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("No token provided");
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/report/my-reports`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Fieled to fetch reports");
      }
      const data = await response.json();
      return data.reports;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Define the asyncThunk for submitting the report
export const submitReport = createAsyncThunk(
  "reports/submitReport",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message);
      }
      // Return the new report data
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// reports slice
const reportSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchUserReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch reports";
      })
      //   handle submitting new report
      .addCase(submitReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Ensure we're adding the report object correctly
        if (action.payload.report) {
          state.reports.unshift(action.payload.report); // Add to beginning
        } else {
          state.reports.unshift(action.payload);
        }
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;
