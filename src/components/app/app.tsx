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

function App(): JSX.Element {

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if(users) {
      setFilteredUsers(users);
    }
  }, [users]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchForm setFilteredUsers={setFilteredUsers} users={users} />
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
