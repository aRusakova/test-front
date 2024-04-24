import styles from "./users-list.module.scss";
import classNames from "classnames";
import UserCard from "../user-card/user-card.tsx";
import { useState, useEffect, useRef } from "react";
import { IUser } from "../../utils/types.ts";

interface IUsersListProps {
  users: IUser[];
  setFilteredUsers: (newList: IUser[]) => void;
}

function UsersList({ users, setFilteredUsers }: IUsersListProps): JSX.Element {
  const [scroll, setScroll] = useState(false);
  const [activeCard, setActiveCard] = useState("");

  const blockRef = useRef<HTMLUListElement | null>(null);
  const timer = useRef<number>(0);

  const handleScroll = () => {
    setScroll(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setScroll(false);
    }, 250);
  };

  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.onscroll = () => {
        handleScroll();
      };
    }
  }, []);

  const onCardClick = (id: string) => {
    setActiveCard(id);
  };

  const deleteUser = (id:string) => {
    const newList = users?.filter((user) => user.login.md5 !== id);
    setFilteredUsers(newList);
  };

  return (
    <div className={classNames(styles.usersBlock, scroll && styles.showScroll)}>
      <div className={styles.shadow}></div>
      <ul className={styles.usersList} ref={blockRef}>
        {users?.map((user) => (
          <li key={user.login.md5}>
            <UserCard
              user={user}
              onCardClick={onCardClick}
              activeCard={activeCard}
              deleteUser={deleteUser}
            />
          </li>
        ))}
      </ul>
      <div className={classNames(styles.shadow, styles.bottom)}></div>
    </div>
  );
}

export default UsersList;
