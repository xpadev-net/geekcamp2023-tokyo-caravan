"use client";

import React, { useEffect, useState } from "react";

import { KeyboardHandler } from "@/lib/keyboardHandler";

import { getRandomItem } from "./dataset_vim";
// import { useRouter } from 'next/router';
import styles from "./TypingGame.module.css";

type Props = {
  onGameOver: (score: number) => void;
};

const TypingGame: React.FC<Props> = ({ onGameOver }) => {
  // ゲームの状態を管理するためのstate変数
  const [score, setScore] = useState<number>(0); // スコア
  const [missCount, setMissCount] = useState<number>(0); // ミスカウント
  const [time, setTime] = useState<number>(30); // 残り時間
  const [isMiss, setIsMiss] = useState<boolean>(false); // ミスしたかどうかのフラグ
  const [label, setLabel] = useState<string>(""); // 入力のラベル
  const [parsedData, setParsedData] = useState<
    | {
        typed: string;
        remaining: string[];
      }
    | undefined
  >();

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
    if (time === 0) {
      onGameOver(score);
      return;
    }
    const timer = window.setTimeout(() => {
      setTime((pv) => Math.max(pv - 1, 0));
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    document.addEventListener("keydown", handleInputChange);
    return () => {
      document.removeEventListener("keydown", handleInputChange);
    };
  }, [missCount]);

  // 新しい単語を生成して初期化する関数
  const generateNewWord = (handler: KeyboardHandler) => {
    const { Question, Answer } = getRandomItem();
    // //todo: データから選択するように変更
    setLabel(Question);
    handler.setText([Answer]);
    setParsedData(handler.getParsedContents());
  };

  // ゲームをリセットする関数
  const reset = () => {
    setScore(0);
    setMissCount(0);
    setTime(30);
    setIsMiss(false);
    const handler = keyboardHandlerRef.current ?? new KeyboardHandler([]);
    generateNewWord(handler);
  };

  // 入力フィールドの変更をハンドルする関数
  const handleInputChange = (e: KeyboardEvent) => {
    const handler = keyboardHandlerRef.current;
    if (!handler) return;
    e.preventDefault();
    const result = handler.handleKeyDown(e);
    if (result.ignore) return;
    setParsedData(handler.getParsedContents());
    setIsMiss(!result.valid);
    if (result.completed) {
      generateNewWord(handler);
      setScore((pv) => pv + 10);
      setTime((pv) => Math.min(pv + 10, 30));
      return;
    }
    if (!result.valid) {
      setScore((pv) => Math.max(pv - 1, 0));
      setTime((pv) => Math.max(pv - 3, 0));
    }
  };

  // UIのレンダリング
  return (
    <div className={styles.game}>
      <div className={styles.header}>
        <div className={styles.scores}>
          <p className={styles.score}>Score : {score}</p>
          <p className={styles.missCount}>MissCount : {missCount}</p>
        </div>
        <div>
          <div className={styles.time}>Time : {time}</div>
          <div className={styles.progressBarBackground}>
            <div
              className={styles.progressBar}
              style={{ width: `${time * 3.33}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <h2 className={styles.label}>{label}</h2>
        <div>
          <div className={styles.keys}>
            <div className={styles.typed}>{parsedData?.typed}</div>
            {(parsedData?.typed.length ?? 0) > 0 && <span> </span>}
            <div
              className={`${isMiss && styles.miss} ${styles.excepted} ${time > 10 && styles.hidden}`}
            >
              {parsedData?.remaining.map((line, index) => {
                return <p key={index}>{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
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
