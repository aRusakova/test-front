import styles from "./refresh-button.module.scss";
import { IFormValues } from "../search-form/search-form";

interface IRefreshButtonProps {
  values: IFormValues;
  refreshUsers: (values: IFormValues) => void;
}

function RefreshButton({
  values,
  refreshUsers,
}: IRefreshButtonProps): JSX.Element {
  return (
    <button
      type="reset"
      className={styles.button}
      onClick={() => refreshUsers(values)}
    >
      Refresh Users
    </button>
  );
}

export default RefreshButton;
