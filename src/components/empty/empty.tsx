import styles from "./empty.module.scss";

function Empty(): JSX.Element {
  return (
    <>
      <p className={styles.text}>Никого не нашли, попробуйте еще раз</p>
    </>
  );
}

export default Empty;
