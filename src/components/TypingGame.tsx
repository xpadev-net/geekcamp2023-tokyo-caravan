"use client";

import React, { useEffect, useState } from "react";

// import { useRouter } from 'next/router';
import styles from "./TypingGame.module.css";

const TypingGame: React.FC = () => {
  // ゲームの状態を管理するためのstate変数
  const [word, setWord] = useState<string>(""); // 表示する単語
  const [input, setInput] = useState<string>(""); // ユーザー入力
  const [score, setScore] = useState<number>(0); // スコア
  const [missCount, setMissCount] = useState<number>(0); // ミスカウント
  const [time, setTime] = useState<number>(30); // 残り時間
  const [gameOver, setGameOver] = useState<boolean>(false); // ゲームオーバーのフラグ
  const [inputBgColor, setInputBgColor] = useState("white"); // 初期値は "white"
  // const router = useRouter();

  // コンポーネントがマウントされた時に新しい単語を生成
  useEffect(() => {
    generateNewWord();
  }, []);

  // 時間のカウントダウンとゲームオーバーのロジックを管理
  useEffect(() => {
    let timer: number;

    // タイマーをセットして時間を減らす
    if (time > 0 && !gameOver && missCount < 5) {
      timer = window.setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if ((time === 0 || missCount >= 5) && !gameOver) {
      // ゲームオーバー条件のチェック
      setGameOver(true);
      // router.push("/gameover");
      alert("Game Over");
    }

    // クリーンアップ関数でタイマーをクリア
    return () => clearTimeout(timer);
  }, [time, gameOver, missCount]);

  // 新しい単語を生成して初期化する関数
  const generateNewWord = () => {
    setWord("");
    setInput("");
  };

  // ゲームをリセットする関数
  const reset = () => {
    setInput("");
    setScore(0);
    setMissCount(0);
    setTime(30);
    setGameOver(false);
    document.getElementById("text")!.style.backgroundColor = "white";
    generateNewWord();
  };

  // 入力フィールドの変更をハンドルする関数
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    // 正しい入力と誤った入力のロジック
    if (!gameOver && missCount < 5) {
      if (userInput === word) {
        // 入力が正しい場合
        setInputBgColor("white"); // 背景色を白に設定
        setScore(score + 10);
        setTime(Math.min(time + 2, 30));
        generateNewWord();
      } else if (userInput.length >= word.length) {
        // 入力が間違っている場合
        setInputBgColor("pink"); // 背景色をピンクに設定
        setInput("");
        setScore(Math.max(score - 1, 0));
        setMissCount(missCount + 1);

        if (missCount + 1 >= 5) {
          // ミスカウントでゲームオーバー
          setGameOver(true);
          alert("Game Over");
        }

        setTime(Math.max(time - 3, 0));
      }
    }
  };

  // UIのレンダリング
  return (
    <div className={styles.game}>
      <div className={styles.time}>Time : {time}</div>
      <div className={styles.progressBarBackground}>
        <div
          className={styles.progressBar}
          style={{ width: `${time * 3.33}%` }}
        ></div>
      </div>
      <p className={styles.score}>Score : {score}</p>
      <p className={styles.missCount}>MissCount : {missCount}</p>
      <h2 className={styles.word}>Word : {word}</h2>
      <input
        id="text"
        className={styles.inputField}
        type="text"
        value={input}
        onChange={handleInputChange}
        style={{ backgroundColor: inputBgColor }}
      />
      <input
        id="reset"
        className={styles.resetButton}
        type="button"
        value="Reset"
        onClick={reset}
      />
    </div>
  );
};

export default TypingGame;
