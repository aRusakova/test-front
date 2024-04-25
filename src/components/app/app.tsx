import styles from "./app.module.scss";
import UsersList from "../users-list/users-list.tsx";
import Loader from "../loader/loader.tsx";
import Counter from "../counter/counter.tsx";
import SearchForm from "../search-form/search-form.tsx";
import Empty from "../empty/empty.tsx";
import Error from "../error/error.tsx";
import { useUsersCounter } from "../../hooks/useUsersCounter.ts";
import { useState } from "react";
import { useUsers } from "../../hooks/useUsers.ts";


function App(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const { users, isFetching, isError, refetch, deleteUser } = useUsers(search);
  const counter = useUsersCounter(users);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchForm setSearch={setSearch} refetch={refetch} />
      </header>
      {isFetching && <Loader />}
      {!isFetching && !isError && !!users?.length && (
        <main className={styles.main}>
          <UsersList users={users} deleteUser={deleteUser} />
          <Counter {...counter} />
        </main>
      )}
      {!isFetching && !isError && !users?.length && <Empty />}
      {!isFetching && !!isError && <Error />}
    </div>
  );
}

export default App;
