// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper function to handle Fetch responses
const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Server Error');
  }
  return response.json();
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/product/all`);
    const data = await handleFetchResponse(response);
    // Assuming the API returns { success: true, data: [...] }
    return data.data;
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}`,
      {
        method: 'DELETE',
      }
    );
    await handleFetchResponse(response);
    return productId;
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedData }) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );
    const data = await handleFetchResponse(response);
    return data.data;
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/bycategory/${categoryId}`
    );
    const data = await handleFetchResponse(response);
    return data.data;
  }
);


// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedProduct: null
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
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle deleteProduct lifecycle
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle updateProduct lifecycle
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
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
  },
});
// Selectors
export const selectProducts = (state) => state.products.items;
export const selectLoading = (state) => state.products.status === 'loading';
export const selectError = (state) => state.products.error;
export const { setSelectedProduct, clearSelectedProduct } = productsSlice.actions;


export default productsSlice.reducer;
