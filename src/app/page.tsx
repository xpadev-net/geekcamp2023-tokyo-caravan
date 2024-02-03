"use client";

import React, { useState } from "react";

import { GameOver } from "@/components/GameOver";

import TypingGame from "../components/TypingGame";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const [status, setStatus] = useState<"top" | "game" | "end">("top");
  const [score, setScore] = useState(0);

  return (
    <div className={styles.wrapper}>
      {status === "top" && (
        <>
          <h1 className={styles.title}>Vim Master Typing Challenge</h1>
          <img
            src="/images/CLI.png"
            alt="Description"
            style={{ maxWidth: "60%", maxHeight: "60vh" }}
          />
          <button onClick={() => setStatus("game")} className={styles.button}>
            ゲーム開始
          </button>
        </>
      )}
      {status === "game" && (
        <TypingGame
          onGameOver={(score) => {
            setScore(score);
            setStatus("end");
          }}
        />
      )}
      {status === "end" && (
        <GameOver
          reset={() => setStatus("top")}
          retry={() => setStatus("game")}
          score={score}
        />
      )}
    </div>
  );
};

export default Home;
