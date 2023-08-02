import { createSlice } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // console.log("state.items", current(state.items));
      const itemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex < 0) {
        state.items.push(action.payload);
      } else {
        state.items[itemIndex].inStock = state.items[itemIndex].inStock + 1;
      }
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (element) => element.card.info.id === action.payload
      );
      item.inStock = item.inStock + 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (element) => element.card.info.id === action.payload
      );
      item.inStock = item.inStock - 1;
      if (item.inStock === 0) {
        const index = state.items.findIndex((el) => el.inStock === 0);
        state.items.splice(index, 1);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
