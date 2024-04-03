import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your invoices reducer
import productsReducer from "./productsSlice"; // Import your products reducer

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer, // Add products reducer to the root reducer
});

export default rootReducer;
