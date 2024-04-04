import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const { id, updatedInvoice } = action.payload;
      const index = state.findIndex((invoice) => invoice.id == id);
      if (index != -1) {
        state[index] = updatedInvoice;
      }
    },
    updateInvoiceProduct: (state, action) => {
      state.forEach((invoice) => {
        const index = invoice.items.findIndex(
          (item) => item.productId === action.payload.id
        );
        if (index !== -1) {
          invoice.items[index].product = action.payload.updatedProduct;
        }
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceProduct,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
