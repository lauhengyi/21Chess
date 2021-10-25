import { useReducer } from "react";
import getKillZone from "./getKillZone";

function V18UseChessMove(boardLayout, chessMovesReducer, saved) {
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
      killZone: getKillZone(),
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default V18UseChessMove;
