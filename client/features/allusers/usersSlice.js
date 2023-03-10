import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsersAsync = createAsyncThunk("allUsers", async () => {
  try {
    const { data } = await axios.get(`/api/users`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const allUsersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => {
  return state.users;
};

export default allUsersSlice.reducer;
