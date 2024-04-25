import styles from "./refresh-button.module.scss";

function RefreshButton() {
  return (
    <button
      type="reset"
      className={styles.button}
    >
      Refresh Users
    </button>
  );
}

export default RefreshButton;
