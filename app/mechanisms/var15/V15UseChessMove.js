import { useReducer } from "react";

function V15UseChessMove(boardLayout, chessMovesReducer, saved) {
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
      orders: [],
      whiteMoney: 50,
      blackMoney: 50,
      clickedOrder: null,
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default V15UseChessMove;
