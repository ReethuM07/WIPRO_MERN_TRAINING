import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const res = await fetch(`${API}/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, s => {
        s.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      .addCase(updateProduct.fulfilled, (s, a) => {
        const index = s.items.findIndex(p => p.id === a.payload.id);
        if (index !== -1) {
          s.items[index] = a.payload;
        }
      });
  }
});

export default productsSlice.reducer;
