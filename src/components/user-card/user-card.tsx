import styles from "./user-card.module.scss";
import classNames from "classnames";
import DeleteIcon from "../../assets/deleteIcon.svg";
import convertDate from "../../utils/convertDate";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import trimString from "../../utils/trimString";
import { IUser } from "../../utils/types";

interface IUserProps {
  user: IUser;
  activeCard: string,
  deleteUser: (id: string) => void;
  onCardClick: (id: string) => void;
}

function UserCard({ user, activeCard, onCardClick, deleteUser }: IUserProps): JSX.Element {
  return (
    <div
      className={classNames(
        styles.card,
        activeCard === user.login.md5 && styles.active
      )}
      onClick={() => onCardClick(user.login.md5)}
    >
      <div
        className={styles.deleteBlock}
        onClick={() => deleteUser(user.login.md5)}
      >
        <img className={styles.deleteIcon} src={DeleteIcon} alt="delete" />
      </div>
      <div className={styles.mainInfo}>
        <img
          className={styles.photo}
          src={user.picture.large}
          alt="user photo"
        />
        <div className={styles.info}>
          <p className={styles.name}>
            {user.name.first} {user.name.last}
          </p>
          <p className={styles.email}>{trimString(user.email, 28)}</p>
        </div>
      </div>
      <ul className={styles.moreInfo}>
        <li className={styles.infoItem}>
          <span className={styles.title}>Phone No</span>
          <span className={styles.value}>{formatPhoneNumber(user.phone)}</span>
        </li>

        <li className={styles.infoItem}>
          <span className={styles.title}>Birthday</span>
          <span className={styles.value}>{convertDate(new Date(user.dob.date))}</span>
        </li>

        <li className={styles.infoItem}>
          <span className={styles.title}>Address</span>
          <span className={styles.value}>
            {trimString(
              `${user.location.state}, ${user.location.city}, ${user.location.country}`, 28
            )}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserCard;
