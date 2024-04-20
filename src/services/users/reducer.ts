import { IUser } from "../../utils/types";
import { loadUsers } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

export interface IUsersStore {
  users?: IUser[];
  loading: boolean;
  error: string | unknown | null;
};

const initialState: IUsersStore = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
