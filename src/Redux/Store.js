import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice';
import userReducer from './features/userSlice';
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    account: userReducer,
  },
});

export default Store;
