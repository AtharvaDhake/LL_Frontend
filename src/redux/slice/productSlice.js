import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to Fetch Products by Collection and optional Filters
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    collection,
    search,
    sort,
    skill,
    age,
    activity,
    minPrice,
    maxPrice,
    page = 1,
    limit = 20,
  }) => {
    // collection is essentially our 'category'
    const query = new URLSearchParams();
    if (collection) query.append("category", collection);
    if (search) query.append("search", search);
    if (sort) query.append("sort", sort);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    // Handling arrays
    if (skill) query.append("skill", skill);
    if (age) query.append("age", age);
    if (activity) query.append("activity", activity);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
    );
    return response.data;
  },
);

// Async Thunk to Fetch a Single Product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
    );
    return response.data;
  },
);
// Async Thunk to Fetch Similar Products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
    );
    return response.data;
  },
);

// Async Thunk to Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null, // Store details for single product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      minPrice: "",
      maxPrice: "",
      skills: [],
      ages: [],
      activities: [],
    },
    sort: "newest", // default sort
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        minPrice: "",
        maxPrice: "",
        skills: [],
        ages: [],
        activities: [],
      };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        // You might want to store total pages, etc. if provided by backend
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Single Product
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload; // Update the selected product if viewed
        // Update the product in the list if present
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, setSort } = productSlice.actions;
export default productSlice.reducer;
