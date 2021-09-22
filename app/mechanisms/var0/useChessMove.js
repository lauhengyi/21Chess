import { useReducer } from "react";
import chessMovesReducer from "./functions/chessMovesReducer";

function useChessMove(boardLayout, saved) {
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
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default useChessMove;
