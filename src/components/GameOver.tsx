import { FC } from "react";

import styles from "./GameOver.module.css";

type Props = {
  reset: () => void;
  retry: () => void;
  score: number;
};

const GameOver: FC<Props> = ({ reset, retry, score }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Game Over</h1>
      <p className={styles.score}>Score: {score}</p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => reset()}>
          Close
        </button>
        <button className={styles.button} onClick={() => retry()}>
          Retry
        </button>
      </div>
    </div>
  );
};

export { GameOver };
