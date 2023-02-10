import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = "/api";
const initialState = {
  loading: true,
  users: [],
};

export const fetchUser = createAsyncThunk("users/fetchUsers", async (user) => {
  return fetch(URL)
    .then((res) => res.json())
    .then((res) => res);
});

export const createNewUser = createAsyncThunk("users/createUser", async (user) => {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      user
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => res);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  return fetch(`http://localhost:4000${URL}/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => res);
});

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    // fetch user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
    });
    // post user
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.users.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createNewUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.loading = false;
    });
    // delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.users.filter(user => user.id !== action.payload);
      state.loading = false;
    });
  }


})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer