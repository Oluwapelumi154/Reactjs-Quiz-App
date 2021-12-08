import { createSlice } from "@reduxjs/toolkit";
const signUpSlices = createSlice({
   name: "user/signUp",
   initialState: {
      loading: false,
      isError: false,

      error: {},
      errormsg: "",
   },
   reducers: {
      signUp_pending: (state) => {
         state.loading = true;
      },
      signUp_fulfilled: (state, { payload }) => {
         state.loading = false;
         state.userDetails = payload.userInfo;
      },
      signUp_rejected: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
         state.errormsg = payload.message;
      },
   },
});
export const { signUp_pending, signUp_fulfilled, signUp_rejected } =
   signUpSlices.actions;
export default signUpSlices.reducer;
