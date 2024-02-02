import React, { useEffect, useState } from "react";

const TypingGame: React.FC = () => {
  // ゲームの状態を管理するためのstate変数
  const [word, setWord] = useState<string>(""); // 表示する単語
  const [input, setInput] = useState<string>(""); // ユーザー入力
  const [score, setScore] = useState<number>(0); // スコア
  const [missCount, setMissCount] = useState<number>(0); // ミスカウント
  const [time, setTime] = useState<number>(30); // 残り時間
  const [gameOver, setGameOver] = useState<boolean>(false); // ゲームオーバーのフラグ

  // コンポーネントがマウントされた時に新しい単語を生成
  useEffect(() => {
    generateNewWord();
  }, []);

  // 時間のカウントダウンとゲームオーバーのロジックを管理
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // タイマーをセットして時間を減らす
    if (time > 0 && !gameOver && missCount < 5) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if ((time === 0 || missCount >= 5) && !gameOver) {
      // ゲームオーバー条件のチェック
      setGameOver(true);
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
        document.getElementById("text")!.style.backgroundColor = "white";
        setScore(score + 10);
        setTime(Math.min(time + 2, 30));
        generateNewWord();
      } else if (userInput.length >= word.length) {
        // 入力が間違っている場合
        document.getElementById("text")!.style.backgroundColor = "pink";
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
    <div className="game m-3">
      {/*<h1 className="m-4 text-4xl" style={{ fontFamily: 'monospace', color: 'white', backgroundColor: 'black', padding: '10px' }}>
          Vim Master Typing Challenge
      </h1> */}
      <div className="text-base dark:text-white">Time : {time}</div>{" "}
      {/*残り時間の表示*/}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
          style={{ width: `${time * 3.33}%` }}
        ></div>{" "}
        {/* 残り時間のビジュアル表現 */}
      </div>
      <p className="m-1">Score : {score}</p> {/* スコアの表示 */}
      <p className="m-1">MissCount : {missCount}</p> {/* ミスカウントの表示 */}
      <h2 className="m-10 text-3xl">Word : {word}</h2> {/* 現在の単語の表示 */}
      <input
        id="text"
        className="m-1"
        type="text"
        value={input}
        onChange={handleInputChange}
      />{" "}
      {/* 入力フィールド */}
      <input
        id="reset"
        className="m-1"
        type="button"
        value="Reset"
        onClick={reset}
      />{" "}
      {/* リセットボタン */}
    </div>
  );
};

export default TypingGame;
