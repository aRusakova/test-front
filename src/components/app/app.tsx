import styles from "./app.module.scss";
import { useEffect, useState } from "react";
import { loadUsers } from "../../services/users/actions";
import { useAppSelector, useAppDispatch } from "../../hooks/store.ts";
import convertDate from "../../utils/convertDate.ts";
import formatPhoneNumber from "../../utils/formatPhoneNumber.ts";

import UsersList from "../users-list/users-list.tsx";
import Loader from "../loader/loader.tsx";
import Counter from "../counter/counter.tsx";
import SearchForm from "../search-form/search-form.tsx";
import Empty from "../empty/empty.tsx";
import Error from '../error/error.tsx';
import { IUser } from "../../utils/types.ts";
import { IUsersCounter } from "../../utils/types.ts";


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const { users, loading, error } = useAppSelector((store) => store.users);

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const [usersCounter, setUsersCounter] = useState<IUsersCounter>({
    fromEleven: 0,
    fromTwentyOne: 0,
    fromThirtyOne: 0,
    fromFortyOne: 0,
    fromFiftyOne: 0,
    male: 0,
    female: 0,
  });

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    if(users) {
      setFilteredUsers(users);
    }
  }, [users]);

  useEffect(() => {
    getUsersCounter();
  }, [filteredUsers]);

  function searchUser(value: string) {
    let currentUsers;
    let newList;
    if(users) {
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
    if(newList) {
      setFilteredUsers(newList);
    }
    
  }

  function getUsersCounter() {
    const fromEleven = filteredUsers?.filter(
      (user) => user.dob.age >= 11 && user.dob.age <= 20
    ).length;
    const fromTwentyOne = filteredUsers?.filter(
      (user) => user.dob.age >= 21 && user.dob.age <= 30
    ).length;
    const fromThirtyOne = filteredUsers?.filter(
      (user) => user.dob.age >= 31 && user.dob.age <= 40
    ).length;
    const fromFortyOne = filteredUsers?.filter(
      (user) => user.dob.age >= 41 && user.dob.age <= 50
    ).length;
    const fromFiftyOne = filteredUsers?.filter(
      (user) => user.dob.age >= 51
    ).length;
    const male = filteredUsers?.filter((user) => user.gender === "male").length;
    const female = filteredUsers?.filter(
      (user) => user.gender === "female"
    ).length;

    setUsersCounter({
      ...usersCounter,
      fromEleven,
      fromTwentyOne,
      fromThirtyOne,
      fromFortyOne,
      fromFiftyOne,
      male,
      female,
    });
  }

  const deleteUser = (id:string) => {
    const newList = filteredUsers?.filter((user) => user.login.md5 !== id);
    setFilteredUsers(newList);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchForm searchUser={searchUser} />
      </header>
      {loading && <Loader />}
      {!loading && !error && !!filteredUsers?.length && (
        <main className={styles.main}>
          <UsersList users={filteredUsers} deleteUser={deleteUser} />
          <Counter usersCounter={usersCounter} users={filteredUsers} />
        </main>
      )}
      {!loading && !error && !filteredUsers?.length && <Empty />}
      {!loading && !!error  && <Error />}
    </div>
  );
}

export default App;
