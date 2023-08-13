import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      isLoggedIn: false,
      name: "",
      email: "",
      address: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user.isLoggedIn = true;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.address = action.payload.user.address;
    },
    removeUser: (state) => {
      state.user.isLoggedIn = false;
      state.user.name = "";
      state.user.email = '';
      state.user.address = '';
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;