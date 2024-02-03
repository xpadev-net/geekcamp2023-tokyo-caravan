"use client";

import React, { useState } from "react";

import TypingGame from "../components/TypingGame";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      {!gameStarted ? (
        <>
          <h1 className={styles.title}>Vim Master Typing Challenge</h1>
          <img
            src="/images/CLI.png"
            alt="Description"
            style={{ maxWidth: "60%", maxHeight: "60vh" }}
          />
          <button
            onClick={() => setGameStarted(true)}
            className={styles.button}
          >
            ゲーム開始
          </button>
        </>
      ) : (
        <TypingGame />
      )}
    </div>
  );
};

export default Home;
