import styles from "./counter.module.scss";
import { useAppSelector } from "../../hooks/store";

function Counter(): JSX.Element {

  const { usersCounter } = useAppSelector((store) => store.users);

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
