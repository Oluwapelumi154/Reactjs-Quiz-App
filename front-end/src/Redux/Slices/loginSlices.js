import { createSlice } from "@reduxjs/toolkit";
const loginSlices = createSlice({
   name: "getUser",
   initialState: {
      loading: false,
      isSuccess: false,
      hasError: false,
      userInfo: localStorage.getItem("userInfo")
         ? JSON.parse(localStorage.getItem("userInfo"))
         : null,
      errormsg: " ",
   },
   reducers: {
      signIn_pending: (state) => {
         state.loading = true;
         state.isSuccess = false;
         state.hasError = false;
      },
      signIn_fulfilled: (state, { payload }) => {
         state.loading = false;
         state.isSuccess = true;
         state.hasError = false;
         state.userInfo = payload.user;
      },
      signIn_rejected: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
         state.errormsg = payload.message;
         state.hasError = true;
         state.isSuccess = false;
      },
      signOut: (state) => {
         state.userInfo = {};
      },
   },
});
export const {
   signIn_pending,
   signIn_fulfilled,
   signIn_rejected,
   signOut,
} = loginSlices.actions;
export default loginSlices.reducer;
