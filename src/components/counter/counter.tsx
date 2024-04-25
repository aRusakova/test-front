import React from "react";
import styles from "./counter.module.scss";

interface Group {
  label: string;
  list: Array<{
    label: string;
    text: string;
  }>
}

interface ICounterProps {
  label: string;
  groups: Group[];
}

function Counter({ label, groups }: ICounterProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <p className={styles.total}>{label}</p>
      {groups.map((group)=> (
        <React.Fragment key={group.label} >
          <hr className={styles.line} />
          <p className={styles.subtitle}>{group.label}</p>
          {group.list.map((item) => (
            <div key={item.label} className={styles.group}>
              <span className={styles.category}>{item.label}</span>
              <span className={styles.quantity}>
                {item.text}
              </span>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Counter;
