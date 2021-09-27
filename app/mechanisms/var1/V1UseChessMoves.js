import { useReducer } from "react";
import getPieceMap from "./getPieceMap";

function V1UseChessMove(boardLayout, chessMovesReducer, saved) {
  let initialDetails;

  if (saved) {
    initialDetails = saved.gameDetails;
  } else {
    //Initialise pieceMap
    const pieceMap = getPieceMap();
    initialDetails = {
      pieceMap: pieceMap,
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

export default V1UseChessMove;
