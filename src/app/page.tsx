"use client";

import React, { CSSProperties, useState } from "react";

import TypingGame from "../components/TypingGame";

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // ページの基本スタイル
  const pageStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column", // 子要素を縦に並べる
    justifyContent: "center", // 子要素を中央に整列（垂直方向）
    alignItems: "center", // 子要素を中央に整列（水平方向）
    backgroundColor: "black",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
  };

  // タイトルのスタイル
  const titleStyle: CSSProperties = {
    color: "white",
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "2px 2px 4px #000000",
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    lineHeight: "1.5em",
    padding: "10px",
    border: "2px solid white",
    borderRadius: "5px",
    backgroundColor: "black",
    boxShadow: "0 0 10px #000000",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%", // 重複削除
  };

  // ボタンのスタイル
  const buttonStyle = {
    color: "white",
    background: "gray",
    fontSize: "24px",
    padding: "15px 30px",
    borderRadius: "10px",
    marginTop: "20px", // ボタンを画像から少し下に配置
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Vim Master Typing Challenge</h1>
      {!gameStarted ? (
        <>
          <img
            src="/images/CLI.png"
            alt="Description"
            style={{ maxWidth: "60%", maxHeight: "60vh" }}
          />
          <button onClick={() => setGameStarted(true)} style={buttonStyle}>
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
