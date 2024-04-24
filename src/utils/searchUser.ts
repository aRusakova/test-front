import formatPhoneNumber from "./formatPhoneNumber";
import convertDate from "./convertDate";
import { IUser } from "./types";

function searchUser(value: string, setFilteredUsers: ((users: IUser[]) => void), users?: IUser[]) {
  let currentUsers;
  let newList;
  if (users) {
    if (value) {
      currentUsers = users;
      newList = currentUsers.filter(
        (user) =>
          `${user.name?.first} ${user.name?.last}`
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          formatPhoneNumber(user.phone)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          convertDate(new Date(user.dob?.date))
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          user.location?.city.toLowerCase().includes(value.toLowerCase()) ||
          user.location?.state.toLowerCase().includes(value.toLowerCase()) ||
          user.location?.country.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      newList = users;
    }
  }
  if (newList) {
    setFilteredUsers(newList);
  }
}

export default searchUser;
