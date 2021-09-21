import checkDarkTheme from "../../../functions/checkDarkTheme";

function V1GetPieceText(piece, pieceMap, theme) {
  //Linking each piece's type to their corresponding chess font
  const mappedType = pieceMap[piece.side][piece.type];
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
    ? pieceKey[!piece.side][mappedType]
    : pieceKey[piece.side][mappedType];

  return pieceText;
}

export default V1GetPieceText;
