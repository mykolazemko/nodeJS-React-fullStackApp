import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = "http://localhost:4000/api";
const initialState = {
  users: ['g'],
};

const fetchUser = createAsyncThunk("users/fetchUsers", async (user) => {
  return fetch(URL)
    .then((res) => res.json())
    // .then((data) => data);
});

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export default  userSlice.reducer
