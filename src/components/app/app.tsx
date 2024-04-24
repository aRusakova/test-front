import styles from "./app.module.scss";
import { useEffect } from "react";
import { loadUsers } from "../../services/users/actions";
import { useAppSelector, useAppDispatch } from "../../hooks/store.ts";
import { searchUser, getUsersCounter } from "../../services/users/reducer.ts";

import UsersList from "../users-list/users-list.tsx";
import Loader from "../loader/loader.tsx";
import Counter from "../counter/counter.tsx";
import SearchForm from "../search-form/search-form.tsx";
import Empty from "../empty/empty.tsx";
import Error from '../error/error.tsx';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const { users, loading, error, filteredUsers } = useAppSelector((store) => store.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    dispatch(searchUser(''))
  }, [users]);

  useEffect(() => {
    dispatch(getUsersCounter());
    console.log(filteredUsers)
  }, [filteredUsers]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchForm />
      </header>
      {loading && <Loader />}
      {!loading && !error && !!filteredUsers?.length && (
        <main className={styles.main}>
          <UsersList users={filteredUsers} />
          <Counter />
        </main>
      )}
      {!loading && !error && !filteredUsers?.length && <Empty />}
      {!loading && !!error  && <Error />}
    </div>
  );
}

export default App;
