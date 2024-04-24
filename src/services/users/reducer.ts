import { IUser, IUsersCounter } from "../../utils/types";
import { loadUsers } from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import convertDate from "../../utils/convertDate";

export interface IUsersStore {
  users?: IUser[];
  loading: boolean;
  error: string | unknown | null;
  filteredUsers?: IUser[];
  usersCounter: IUsersCounter;
}

const initialState: IUsersStore = {
  users: [],
  loading: false,
  error: null,
  filteredUsers: [],
  usersCounter: {
    total: 0,
    fromEleven: 0,
    fromTwentyOne: 0,
    fromThirtyOne: 0,
    fromFortyOne: 0,
    fromFiftyOne: 0,
    male: 0,
    female: 0,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserFromList: (state, action) => {
      state.filteredUsers = state.filteredUsers?.filter(
        (user) => user.login.md5 !== action.payload
      );
    },

    getUsersCounter: (state) => {
      state.usersCounter.total = state.filteredUsers?.length;
      state.usersCounter.fromEleven = state.filteredUsers?.filter(
        (user) => user.dob.age >= 11 && user.dob.age <= 20
      ).length;
      state.usersCounter.fromTwentyOne = state.filteredUsers?.filter(
        (user) => user.dob.age >= 21 && user.dob.age <= 30
      ).length;
      state.usersCounter.fromThirtyOne = state.filteredUsers?.filter(
        (user) => user.dob.age >= 31 && user.dob.age <= 40
      ).length;
      state.usersCounter.fromFortyOne = state.filteredUsers?.filter(
        (user) => user.dob.age >= 41 && user.dob.age <= 50
      ).length;
      state.usersCounter.fromFiftyOne = state.filteredUsers?.filter(
        (user) => user.dob.age >= 51
      ).length;
      state.usersCounter.male = state.filteredUsers?.filter(
        (user) => user.gender === "male"
      ).length;
      state.usersCounter.female = state.filteredUsers?.filter(
        (user) => user.gender === "female"
      ).length;
    },

    searchUser: (state, action) => {
      if (action.payload) {
        state.filteredUsers = state.users?.filter(
          (user) =>
            `${user.name?.first} ${user.name?.last}`
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.email.toLowerCase().includes(action.payload.toLowerCase()) ||
            formatPhoneNumber(user.phone)
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            convertDate(new Date(user.dob?.date))
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.location?.city
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.location?.state
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.location?.country
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      } else {
        state.filteredUsers = state.users;
      }
    },
  },
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
export const { deleteUserFromList, getUsersCounter, searchUser } =
  usersSlice.actions;
