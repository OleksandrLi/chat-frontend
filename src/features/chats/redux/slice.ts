import { createSlice } from "@reduxjs/toolkit";

// import { updateAvatarThunk } from "./thunk";
// import { getProfileThunk } from "../../auth/redux/thunk";
// import { User } from "../../auth/types";
//
// const initialState = {
//   isAuth: false,
//   isLoading: false,
//   error: "" as undefined | string,
//   currentUser: {} as User,
// };
//
// export const chatsSlice = createSlice({
//   name: "chats",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getProfileThunk.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(getProfileThunk.fulfilled, (state, { payload }) => {
//       state.isLoading = false;
//       state.isAuth = true;
//       state.currentUser = payload.profile;
//     });
//     builder.addCase(getProfileThunk.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     });
//
//   },
// });
//
// // export const {} = chatsSlice.actions;
// export default chatsSlice.reducer;
