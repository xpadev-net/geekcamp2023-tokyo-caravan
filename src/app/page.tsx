"use client";

import React, { useState } from "react";

import TypingGame from "../components/TypingGame";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Vim Master Typing Challenge</h1>
      {!gameStarted ? (
        <>
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
