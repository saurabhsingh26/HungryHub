import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // console.log("state.items", current(state.items));
      console.log("action", action);
      const itemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex < 0) {
        state.items.push(action.payload);
      } else {
        state.items[itemIndex].card.info.inStock =
          state.items[itemIndex].card.info.inStock + 1;
      }
      console.log("state.items", current(state.items));
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
      item.card.info.inStock = item.card.info.inStock + 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (element) => element.card.info.id === action.payload
      );
      item.card.info.inStock = item.card.info.inStock - 1;
      if(item.card.info.inStock === 0){
        const index = state.items.findIndex((el) => el.card.info.inStock === 0);
        state.items.splice(index,1);
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
