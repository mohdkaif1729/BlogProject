import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  logoutStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      if(!(action.payload.userData)){
        state.userData = action.payload;
      }
      else{
        state.userData = action.payload.userData;
      }
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.logoutStatus = true;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
