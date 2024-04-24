import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../utils/users-api";

export const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async (_, thunkAPI) => {
    try {
  
      const res = await getUsers();
      return res;
      
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

