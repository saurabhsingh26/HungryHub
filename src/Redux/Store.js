import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice'
const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default Store;
