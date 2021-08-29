import checkDarkTheme from "./checkDarkTheme";

function getPieceText(piece, theme) {
  //Linking each piece's type to their corresponding chess font
  const pieceKey = {
    true: {
      p: "p",
      r: "r",
      n: "n",
      b: "b",
      q: "q",
      k: "k",
    },

    false: {
      p: "o",
      r: "t",
      n: "m",
      b: "v",
      q: "w",
      k: "l",
    },
  };

  //Switch the fonts of black and white pieces around if theme is dark
  const isDark = checkDarkTheme(theme);
  const pieceText = isDark
    ? pieceKey[!piece.side][piece.type]
    : pieceKey[piece.side][piece.type];

  return pieceText;
}

export default getPieceText;
