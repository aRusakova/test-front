import styles from "./counter.module.scss";
import { useState, useEffect } from "react";
import { IUsersCounter } from "../../utils/types";
import { IUser } from "../../utils/types";

interface ICounterProps {
  users: IUser[];
}

function Counter({ users }: ICounterProps): JSX.Element {

  const [usersCounter, setUsersCounter] = useState<IUsersCounter>({
    total: 0,
    fromEleven: 0,
    fromTwentyOne: 0,
    fromThirtyOne: 0,
    fromFortyOne: 0,
    fromFiftyOne: 0,
    male: 0,
    female: 0,
  });

  useEffect(() => {
    getUsersCounter();
  }, [users]);

  function getUsersCounter() {
    const total = users?.length;
    const fromEleven = users?.filter(
      (user) => user.dob.age >= 11 && user.dob.age <= 20
    ).length;
    const fromTwentyOne = users?.filter(
      (user) => user.dob.age >= 21 && user.dob.age <= 30
    ).length;
    const fromThirtyOne = users?.filter(
      (user) => user.dob.age >= 31 && user.dob.age <= 40
    ).length;
    const fromFortyOne = users?.filter(
      (user) => user.dob.age >= 41 && user.dob.age <= 50
    ).length;
    const fromFiftyOne = users?.filter((user) => user.dob.age >= 51).length;
    const male = users?.filter((user) => user.gender === "male").length;
    const female = users?.filter((user) => user.gender === "female").length;

    setUsersCounter({
      ...usersCounter,
      total,
      fromEleven,
      fromTwentyOne,
      fromThirtyOne,
      fromFortyOne,
      fromFiftyOne,
      male,
      female,
    });
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.total}>{usersCounter?.total} Users</p>
      <hr className={styles.line} />
      <p className={styles.subtitle}>Age Groups</p>
      <div className={styles.group}>
        <span className={styles.category}>11 to 20</span>
        <span className={styles.quantity}>
          {usersCounter?.fromEleven} users
        </span>
      </div>

      <div className={styles.group}>
        <span className={styles.category}>21 to 30</span>
        <span className={styles.quantity}>
          {usersCounter?.fromTwentyOne} users
        </span>
      </div>

      <div className={styles.group}>
        <span className={styles.category}>31 to 40</span>
        <span className={styles.quantity}>
          {usersCounter?.fromThirtyOne} users
        </span>
      </div>

      <div className={styles.group}>
        <span className={styles.category}>41 to 50</span>
        <span className={styles.quantity}>
          {usersCounter?.fromFortyOne} users
        </span>
      </div>

      <div className={styles.group}>
        <span className={styles.category}>51+</span>
        <span className={styles.quantity}>
          {usersCounter?.fromFiftyOne} users
        </span>
      </div>
      <hr className={styles.line} />
      <p className={styles.subtitle}>Gender Groups</p>
      <div className={styles.group}>
        <span className={styles.category}>Male</span>
        <span className={styles.quantity}>{usersCounter?.male} users</span>
      </div>
      <div className={styles.group}>
        <span className={styles.category}>Female</span>
        <span className={styles.quantity}>{usersCounter?.female} users</span>
      </div>
    </div>
  );
}

export default Counter;
