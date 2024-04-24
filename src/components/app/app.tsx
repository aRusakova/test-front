import styles from "./app.module.scss";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../utils/users-api.ts";
import { useState } from "react";
import { IUser } from "../../utils/types.ts";

import UsersList from "../users-list/users-list.tsx";
import Loader from "../loader/loader.tsx";
import Counter from "../counter/counter.tsx";
import SearchForm from "../search-form/search-form.tsx";
import Empty from "../empty/empty.tsx";
import Error from "../error/error.tsx";

import formatPhoneNumber from "../../utils/formatPhoneNumber.ts";
import convertDate from "../../utils/convertDate.ts";

function App(): JSX.Element {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    if(data) {
      setFilteredUsers(data);
    }
  }, [data]);

  function searchUser(value: string) {
    let currentUsers;
    let newList;
    if(data) {
    if (value) {
      currentUsers = data;
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
      newList = data;
    }
  }
    if(newList) {
      setFilteredUsers(newList);
    }

  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchForm searchUser={searchUser} />
      </header>
      {isLoading && <Loader />}
      {!isLoading && !isError && !!filteredUsers?.length && (
        <main className={styles.main}>
          <UsersList users={filteredUsers} setFilteredUsers={setFilteredUsers} />
          <Counter users={filteredUsers} />
        </main>
      )}
      {!isLoading && !isError && !filteredUsers?.length && <Empty />}
      {!isLoading && !!isError && <Error />}
    </div>
  );
}

export default App;
