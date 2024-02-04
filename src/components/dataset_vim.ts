const Dataset_vim = [
  {
    Question: "fileAを開く",
    Answer: "vim fileA",
  },
  {
    Question: "vimを閉じる",
    Answer: ":q",
  },
  {
    Question: "ファイルを保存する",
    Answer: ":w",
  },
  {
    Question: "変更を破棄してvimを閉じる",
    Answer: ":q!",
  },
  {
    Question: "カーソルを左に1文字移動する",
    Answer: "h",
  },
  {
    Question: "カーソルを下に1行移動する",
    Answer: "j",
  },
  {
    Question: "カーソルを上に1行移動する",
    Answer: "k",
  },
  {
    Question: "カーソルを右に1文字移動する",
    Answer: "l",
  },
  {
    Question: "前方に単語１つ分移動する",
    Answer: "w",
  },
  {
    Question: "後方に単語１つ分移動する",
    Answer: "b",
  },
  {
    Question: "スペース区切りで前方に単語１つぶん移動する",
    Answer: "W",
  },
  {
    Question: "スペース区切りで後方に単語１つぶん移動する",
    Answer: "B",
  },
  {
    Question: "行頭に移動する",
    Answer: "0",
  },
  {
    Question: "行末に移動する",
    Answer: "$",
  },
  {
    Question: "１行目に移動する",
    Answer: "gg",
  },
  {
    Question: "最後の行に移動する",
    Answer: "G",
  },
  {
    Question: "カーソルから行末まで削除",
    Answer: "D",
  },
  {
    Question: "行をデリート",
    Answer: "dd",
  },
  {
    Question: "カーソルから行末までコピー",
    Answer: "Y",
  },
  {
    Question: "ペースト(貼り付ける)",
    Answer: "p",
  },
  {
    Question: "カーソル位置の左に文字を入力する (インサートモードに切り替える)",
    Answer: "i",
  },
  {
    Question: "カーソル位置の右に文字を入力する (インサートモードに切り替える)",
    Answer: "a",
  },
  {
    Question: "ノーマルモードに切り替える",
    Answer: "「Escape」",
  },
  {
    Question: "カーソル位置の文字を削除する",
    Answer: "x",
  },
  {
    Question: "行を連結する",
    Answer: "J",
  },
  {
    Question: "アンドゥ(元に戻す)",
    Answer: "u",
  },
  {
    Question: "リドゥ(やり直す)",
    Answer: "｛「Control」r｝",
  },
  {
    Question: '"hello world"という文字列を下方向に検索する',
    Answer: "/hello world",
  },
  {
    Question: '"Vim"という文字列を上方向に検索する',
    Answer: "?Vim",
  },
  {
    Question: "次の検索結果に移動する",
    Answer: "n",
  },
  {
    Question: "前の検索結果に移動する",
    Answer: "N",
  },
  {
    Question: "チュートリアルを開く(コマンド)",
    Answer: "vimtutor",
  },
  {
    Question: "ヘルプ",
    Answer: ":help",
  },
];

let usedIndex: number[] = [];

export const getRandomItem = () => {
  if (usedIndex.length === Dataset_vim.length) {
    usedIndex = [];
  }
  let index = Math.floor((Dataset_vim.length - 1) * Math.random());
  while (usedIndex.includes(index)) {
    index = Math.floor((Dataset_vim.length - 1) * Math.random());
  }
  usedIndex.push(index);
  return Dataset_vim[index];
};
