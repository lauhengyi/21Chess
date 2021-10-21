import { useReducer } from "react";
import makeMineMatrix from "./functions/makeMineMatrix";

function V17UseChessMove(boardLayout, chessMovesReducer, saved) {
  let initialDetails;
  if (saved) {
    initialDetails = saved.gameDetails;
  } else {
    initialDetails = {
      boardLayout: boardLayout,
      moveables: [null, null],
      clickedSquare: null,
      currentSide: true,
      lastMoved: [null, null, null],
      eatenPieces: [],
      previousBoards: [],
      checked: 0,
      stalemated: 0,
      checkmated: 0,
      repetition: false,
      promotion: null,
      mineMatrix: makeMineMatrix(boardLayout),
      count: 0,
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default V17UseChessMove;
