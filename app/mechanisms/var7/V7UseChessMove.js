import { useReducer } from "react";
import initialiseTurns from "./functions/initialiseTurns";

function V7UseChessMove(boardLayout, chessMovesReducer, saved) {
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
      turnsOrder: initialiseTurns(),
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default V7UseChessMove;
