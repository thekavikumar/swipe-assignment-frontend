import { createSlice } from "@reduxjs/toolkit";
import { updateInvoiceInInvoices } from "./invoicesSlice";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.findIndex((product) => product.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedProduct };
      }
      updateInvoiceInInvoices(state[index]);
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } =
  productsSlice.actions;

export const selectProductList = (state) => state.products;

export default productsSlice.reducer;
