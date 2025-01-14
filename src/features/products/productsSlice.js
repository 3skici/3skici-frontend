// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to handle Fetch responses
const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Server Error");
  }
  return response.json();
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/all`
    );
    const data = await handleFetchResponse(response);
    // Assuming the API returns { success: true, data: [...] }
    return data.data;
  }
);

// fetch user products
export const fetchUserProducts = createAsyncThunk(
  "products/fetchUserProducts",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/user-product/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      // parse the response data
      const data = await response.json();
      return data; //Return the data to be used by the reducer
    } catch (error) {
      // Handle any errors during the fetch
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a product
export const deleteUserProduct = createAsyncThunk(
  "products/deleteUserProduct",
  async (productId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/user-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      return productId; // Return the deleted product's ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updatedData }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      const data = await handleFetchResponse(response);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/bycategory/${categoryId}`
    );
    const data = await handleFetchResponse(response);
    return data.products;
  }
);

// fetch product by customId
export const fetchedProductByCustomId = createAsyncThunk(
  "products/fetchedProductByCustomId",
  async (customId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/${customId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Ensure the response is valid
      if (!response.ok) {
        return rejectWithValue(
          "Failed to fetch product: " + response.statusText
        );
      }

      const data = await handleFetchResponse(response);
      // Assuming the API returns { success: true, data: [...] }
      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue("Product not found or API error.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return rejectWithValue("Error fetching product: " + error.message);
    }
  }
);

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedProduct: null,
    fetchedProductByCustomId: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts lifecycle
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete user product
      .addCase(deleteUserProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Filter out the deleted product by its ID
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteUserProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle updateProduct lifecycle
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetched product by customID
      .addCase(fetchedProductByCustomId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchedProductByCustomId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchedProductByCustomId = action.payload;
      })
      .addCase(fetchedProductByCustomId.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
// Selectors
export const selectProducts = (state) => state.products.items;
export const selectLoading = (state) => state.products.status === "loading";
export const selectError = (state) => state.products.error;
export const { setSelectedProduct, clearSelectedProduct } =
  productsSlice.actions;
export const selectFetchedProductByCustomId = (state) =>
  state.products.fetchedProductByCustomId;

export default productsSlice.reducer;
