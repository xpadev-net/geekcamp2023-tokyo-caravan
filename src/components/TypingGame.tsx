"use client";

import React, { KeyboardEventHandler, useEffect, useState } from "react";

import { KeyboardHandler } from "@/lib/keyboardHandler";

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

  const keyboardHandlerRef = React.useRef<KeyboardHandler>();
  // const router = useRouter();

  // コンポーネントがマウントされた時に新しい単語を生成
  useEffect(() => {
    const handler = new KeyboardHandler([]);
    generateNewWord(handler);
    keyboardHandlerRef.current = handler;
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
  const generateNewWord = (handler: KeyboardHandler) => {
    //todo: データから選択するように変更
    handler.setText(["test"]);
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
    setInputBgColor("white");
    const handler = keyboardHandlerRef.current ?? new KeyboardHandler([]);
    generateNewWord(handler);
  };

  // 入力フィールドの変更をハンドルする関数
  const handleInputChange: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const handler = keyboardHandlerRef.current;
    if (!handler) return;
    const result = handler.handleKeyDown(e.nativeEvent);
    if (result.completed) {
      generateNewWord(handler);
      setScore((pv) => pv + 10);
      setTime((pv) => Math.min(pv + 2, 30));
      return;
    }
    if (!result.valid) {
      setInputBgColor("pink");
      setScore((pv) => Math.max(pv - 1, 0));
      if (missCount > 4) {
        setGameOver(true);
        alert("Game Over");
      }
      setMissCount((pv) => pv + 1);
      setTime(Math.max(time - 3, 0));
    }
  };

  // UIのレンダリング
  return (
    <div className={styles.game} onKeyDown={handleInputChange}>
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
        onChange={(e) => setInput(e.target.value)}
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
