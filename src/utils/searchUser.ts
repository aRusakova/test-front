import formatPhoneNumber from "./formatPhoneNumber";
import convertDate from "./convertDate";
import { IUser } from "./types";

export function searchUsers(users?: IUser[] | null, search: string = '') {
  if (!search) {
    return users;
  }
  if (!users) {
    return [];
  }
  return users.filter((user) =>
    `${user.name?.first} ${user.name?.last}`
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    formatPhoneNumber(user.phone)
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    convertDate(new Date(user.dob?.date))
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.location?.city.toLowerCase().includes(search.toLowerCase()) ||
    user.location?.state.toLowerCase().includes(search.toLowerCase()) ||
    user.location?.country.toLowerCase().includes(search.toLowerCase()));
}
