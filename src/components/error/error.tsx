import styles from "./error.module.scss";

function Error(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Что-то пошло не так . . . <br /> Пожалуйста попробуйте перезагрузить
        страницу
      </p>
    </div>
  );
}

export default Error;
