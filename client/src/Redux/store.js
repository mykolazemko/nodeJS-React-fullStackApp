// import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice";

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})