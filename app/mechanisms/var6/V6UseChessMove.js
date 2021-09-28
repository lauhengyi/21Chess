import { useReducer } from "react";

function V6UseChessMove(boardLayout1, boardLayout2, chessMovesReducer, saved) {
  let initialDetails;
  if (saved) {
    initialDetails = saved.gameDetails;
  } else {
    initialDetails = {
      currentGame: true,
      true: {
        boardLayout: boardLayout1,
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
      },

      false: {
        boardLayout: boardLayout2,
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
      },
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default V6UseChessMove;
